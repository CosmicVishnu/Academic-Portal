import { Router, Request, Response } from 'express';
import { Announcement } from '../models/Announcement';
import { verifyToken } from '../middleware/auth';
import { requireRole } from '../middleware/roles';

const router = Router();

// ─── GET /api/announcements — list all published announcements ────────────────
router.get('/', verifyToken, async (_req: Request, res: Response): Promise<void> => {
  try {
    const announcements = await Announcement.find({ status: 'published' })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: announcements });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch announcements.' });
  }
});

// ─── GET /api/announcements/all — all including drafts (teacher/admin) ─────────
router.get('/all', verifyToken, requireRole('teacher', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.user!.role === 'admin'
      ? {}
      : { author: req.user!.id }; // teachers see only their own

    const announcements = await Announcement.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: announcements });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch announcements.' });
  }
});

// ─── POST /api/announcements — create announcement (teacher, admin) ────────────
router.post('/', verifyToken, requireRole('teacher', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, priority, category, targetAudience, tags, scheduledDate, status } = req.body;

    if (!title || !content) {
      res.status(400).json({ success: false, message: 'Title and content are required.' });
      return;
    }

    const announcement = new Announcement({
      title,
      content,
      priority: priority || 'medium',
      category: category || 'announcement',
      author: req.user!.id,
      authorName: req.user!.name,
      targetAudience: targetAudience || 'all',
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim())) : [],
      scheduledDate: scheduledDate || undefined,
      status: status || 'published',
    });

    await announcement.save();
    res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create announcement.' });
  }
});

// ─── PUT /api/announcements/:id — update (author or admin) ───────────────────
router.put('/:id', verifyToken, requireRole('teacher', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      res.status(404).json({ success: false, message: 'Announcement not found.' });
      return;
    }

    // Only author or admin can update
    if (req.user!.role !== 'admin' && announcement.author.toString() !== req.user!.id) {
      res.status(403).json({ success: false, message: 'Access denied.' });
      return;
    }

    const updated = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update announcement.' });
  }
});

// ─── DELETE /api/announcements/:id — delete (author or admin) ────────────────
router.delete('/:id', verifyToken, requireRole('teacher', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      res.status(404).json({ success: false, message: 'Announcement not found.' });
      return;
    }

    if (req.user!.role !== 'admin' && announcement.author.toString() !== req.user!.id) {
      res.status(403).json({ success: false, message: 'Access denied.' });
      return;
    }

    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Announcement deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete announcement.' });
  }
});

export default router;
