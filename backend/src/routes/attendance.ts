import { Router, Request, Response } from 'express';
import { Attendance } from '../models/Attendance';
import { verifyToken } from '../middleware/auth';
import { requireRole } from '../middleware/roles';

const router = Router();

// ─── GET /api/attendance/student/:id — get attendance for a student ───────────
router.get('/student/:id', verifyToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const requestingUser = req.user!;

    if (requestingUser.role === 'student' && requestingUser.id !== id) {
      res.status(403).json({ success: false, message: 'Access denied.' });
      return;
    }

    const records = await Attendance.find({ studentId: id })
      .populate('courseId', 'name code')
      .sort({ date: -1 });

    // Aggregate by course
    const byCourse: Record<string, { courseName: string; courseCode: string; totalClasses: number; attended: number; percentage: number; records: unknown[] }> = {};

    for (const record of records) {
      const course = record.courseId as unknown as { _id: string; name: string; code: string };
      const courseId = course._id.toString();
      if (!byCourse[courseId]) {
        byCourse[courseId] = {
          courseName: course.name,
          courseCode: course.code,
          totalClasses: 0,
          attended: 0,
          percentage: 0,
          records: [],
        };
      }
      byCourse[courseId].totalClasses++;
      if (record.status === 'present' || record.status === 'late') {
        byCourse[courseId].attended++;
      }
      byCourse[courseId].records.push(record);
    }

    // Calculate percentages
    Object.values(byCourse).forEach(c => {
      c.percentage = c.totalClasses > 0 ? Math.round((c.attended / c.totalClasses) * 100) : 0;
    });

    res.json({ success: true, data: Object.values(byCourse) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch attendance.' });
  }
});

// ─── GET /api/attendance/course/:courseId — get attendance for a course ────────
router.get('/course/:courseId', verifyToken, requireRole('teacher', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const records = await Attendance.find({ courseId: req.params.courseId })
      .populate('studentId', 'name email rollNumber')
      .sort({ date: -1 });

    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch attendance.' });
  }
});

// ─── POST /api/attendance — mark attendance (teacher, admin) ──────────────────
router.post('/', verifyToken, requireRole('teacher', 'admin'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { records, courseId, date, period } = req.body;
    // records: Array<{ studentId: string; status: 'present' | 'absent' | 'late' }>

    if (!records || !Array.isArray(records) || !courseId || !date) {
      res.status(400).json({ success: false, message: 'records, courseId and date are required.' });
      return;
    }

    const ops = records.map((r: { studentId: string; status: string }) => ({
      updateOne: {
        filter: { studentId: r.studentId, courseId, date: new Date(date), period: period || '' },
        update: { studentId: r.studentId, courseId, date: new Date(date), status: r.status, markedBy: req.user!.id, period: period || '' },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(ops);
    res.status(201).json({ success: true, message: `Attendance saved for ${records.length} students.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to save attendance.' });
  }
});

export default router;
