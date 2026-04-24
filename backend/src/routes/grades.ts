import { Router, Request, Response } from 'express';
import { Grade } from '../models/Grade';
import { verifyToken } from '../middleware/auth';
import { requireRole } from '../middleware/roles';

const router = Router();

// ─── GET /api/grades/student/:id — get grades for a student ──────────────────
router.get('/student/:id', verifyToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const requestingUser = req.user!;

    // Students can only view their own grades
    if (requestingUser.role === 'student' && requestingUser.id !== id) {
      res.status(403).json({ success: false, message: 'Access denied.' });
      return;
    }

    const grades = await Grade.find({ studentId: id })
      .populate('courseId', 'name code credits')
      .sort({ semester: 1 });

    res.json({ success: true, data: grades });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch grades.' });
  }
});

// ─── POST /api/grades — add/update grade (teacher, admin) ────────────────────
router.post('/', verifyToken, requireRole('teacher', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentId, courseId, marks, semester, examType } = req.body;

    // Upsert: update if exists, create if not
    const grade = await Grade.findOneAndUpdate(
      { studentId, courseId, examType: examType || 'internal' },
      { studentId, courseId, marks, semester, examType: examType || 'internal', gradedBy: req.user!.id, gradedAt: new Date() },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({ success: true, data: grade });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save grade.' });
  }
});

// ─── GET /api/grades/course/:courseId — get all grades for a course ───────────
router.get('/course/:courseId', verifyToken, requireRole('teacher', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const grades = await Grade.find({ courseId: req.params.courseId })
      .populate('studentId', 'name email rollNumber')
      .sort({ marks: -1 });

    res.json({ success: true, data: grades });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch grades.' });
  }
});

export default router;
