import { Router, Request, Response } from 'express';
import { Course } from '../models/Course';
import { verifyToken } from '../middleware/auth';
import { requireRole } from '../middleware/roles';

const router = Router();

// ─── GET /api/courses — list all courses (authenticated) ──────────────────────
router.get('/', verifyToken, async (_req: Request, res: Response): Promise<void> => {
  try {
    const courses = await Course.find({ isActive: true })
      .populate('facultyId', 'name email department')
      .sort({ name: 1 });
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch courses.' });
  }
});

// ─── GET /api/courses/:id ─────────────────────────────────────────────────────
router.get('/:id', verifyToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findById(req.params.id).populate('facultyId', 'name email');
    if (!course) {
      res.status(404).json({ success: false, message: 'Course not found.' });
      return;
    }
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch course.' });
  }
});

// ─── POST /api/courses — create course (admin) ────────────────────────────────
router.post('/', verifyToken, requireRole('admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create course.' });
  }
});

// ─── PUT /api/courses/:id — update course (admin) ────────────────────────────
router.put('/:id', verifyToken, requireRole('admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      res.status(404).json({ success: false, message: 'Course not found.' });
      return;
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update course.' });
  }
});

export default router;
