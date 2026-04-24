import mongoose, { Document, Schema } from 'mongoose';

// ─── OOP Class: Attendance ────────────────────────────────────────────────────
export class AttendanceClass {
  studentId: string;
  courseId: string;
  date: Date;
  status: 'present' | 'absent' | 'late';

  constructor(studentId: string, courseId: string, date: Date, status: 'present' | 'absent' | 'late') {
    this.studentId = studentId;
    this.courseId = courseId;
    this.date = date;
    this.status = status;
  }

  isPresent(): boolean {
    return this.status === 'present' || this.status === 'late';
  }

  static calculatePercentage(records: AttendanceClass[]): number {
    if (records.length === 0) return 0;
    const present = records.filter(r => r.isPresent()).length;
    return Math.round((present / records.length) * 100);
  }
}

// ─── Mongoose Document Interface ─────────────────────────────────────────────
export interface IAttendance extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  date: Date;
  status: 'present' | 'absent' | 'late';
  markedBy: mongoose.Types.ObjectId;
  period: string;
}

// ─── Mongoose Schema ──────────────────────────────────────────────────────────
const attendanceSchema = new Schema<IAttendance>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['present', 'absent', 'late'], required: true },
    markedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    period: { type: String, default: '' },
  },
  { timestamps: true }
);

// Compound index — one attendance record per student per course per date per period
attendanceSchema.index({ studentId: 1, courseId: 1, date: 1, period: 1 }, { unique: true });

export const Attendance = mongoose.model<IAttendance>('Attendance', attendanceSchema);
