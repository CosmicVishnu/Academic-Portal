import { Router, Request, Response } from 'express';
import { Faculty } from '../models/Faculty';
import { User } from '../models/User';
import { verifyToken } from '../middleware/auth';
import { requireRole } from '../middleware/roles';

const router = Router();

// ─── GET /api/faculty — list all faculty (admin) ──────────────────────────────
router.get('/', verifyToken, requireRole('admin'), async (_req: Request, res: Response): Promise<void> => {
  try {
    const faculty = await Faculty.find({ isActive: true }).select('-password').populate('courses', 'name code').sort({ name: 1 });
    res.json({ success: true, data: faculty.map(f => f.toJSON()) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch faculty.' });
  }
});

// ─── GET /api/faculty/all-users — combined users list for admin ───────────────
router.get('/all-users', verifyToken, requireRole('admin'), async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({}).select('-password').sort({ role: 1, name: 1 });
    res.json({ success: true, data: users.map(u => u.toJSON()) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users.' });
  }
});

// ─── GET /api/faculty/:id ─────────────────────────────────────────────────────
router.get('/:id', verifyToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const faculty = await Faculty.findById(req.params.id).select('-password').populate('courses', 'name code');
    if (!faculty) {
      res.status(404).json({ success: false, message: 'Faculty member not found.' });
      return;
    }
    res.json({ success: true, data: faculty.toJSON() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch faculty member.' });
  }
});

// ─── PUT /api/faculty/:id — update faculty (admin) ───────────────────────────
router.put('/:id', verifyToken, requireRole('admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!updated) {
      res.status(404).json({ success: false, message: 'Faculty not found.' });
      return;
    }
    res.json({ success: true, data: updated.toJSON() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update faculty.' });
  }
});

// ─── DELETE /api/faculty/:id — deactivate (admin) ────────────────────────────
router.delete('/:id', verifyToken, requireRole('admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    await Faculty.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Faculty member deactivated.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to deactivate faculty.' });
  }
});

export default router;
