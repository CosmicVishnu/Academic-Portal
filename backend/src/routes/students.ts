import { Router, Request, Response } from 'express';
import { Student } from '../models/Student';
import { verifyToken } from '../middleware/auth';
import { requireRole } from '../middleware/roles';

const router = Router();

// ─── GET /api/students — list all students (admin, teacher) ───────────────────
router.get('/', verifyToken, requireRole('admin', 'teacher'), async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find({ isActive: true }).select('-password').sort({ name: 1 });
    res.json({ success: true, data: students.map(s => s.toJSON()) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch students.' });
  }
});

// ─── GET /api/students/:id — get student by id (self, teacher, admin) ─────────
router.get('/:id', verifyToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const requestingUser = req.user!;

    // Students can only view their own profile
    if (requestingUser.role === 'student' && requestingUser.id !== id) {
      res.status(403).json({ success: false, message: 'Access denied.' });
      return;
    }

    const student = await Student.findById(id).select('-password');
    if (!student) {
      res.status(404).json({ success: false, message: 'Student not found.' });
      return;
    }

    res.json({ success: true, data: student.toJSON() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch student.' });
  }
});

// ─── PUT /api/students/:id — update student (admin only) ─────────────────────
router.put('/:id', verifyToken, requireRole('admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!updated) {
      res.status(404).json({ success: false, message: 'Student not found.' });
      return;
    }
    res.json({ success: true, data: updated.toJSON() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update student.' });
  }
});

// ─── DELETE /api/students/:id — deactivate student (admin) ───────────────────
router.delete('/:id', verifyToken, requireRole('admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    await Student.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Student deactivated.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to deactivate student.' });
  }
});

export default router;
