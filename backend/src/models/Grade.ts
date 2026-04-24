import mongoose, { Document, Schema } from 'mongoose';

// ─── OOP Class: Grade ─────────────────────────────────────────────────────────
export class GradeClass {
  studentId: string;
  courseId: string;
  marks: number;
  grade: string;
  semester: number;

  constructor(studentId: string, courseId: string, marks: number, semester: number) {
    this.studentId = studentId;
    this.courseId = courseId;
    this.marks = marks;
    this.semester = semester;
    this.grade = this.calculateGrade(marks);
  }

  private calculateGrade(marks: number): string {
    if (marks >= 90) return 'S';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
  }

  isPassing(): boolean {
    return this.marks >= 50;
  }
}

// ─── Mongoose Document Interface ─────────────────────────────────────────────
export interface IGrade extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  marks: number;
  grade: string;
  semester: number;
  examType: 'internal' | 'midterm' | 'final';
  gradedBy: mongoose.Types.ObjectId;
  gradedAt: Date;
}

// ─── Mongoose Schema ──────────────────────────────────────────────────────────
const gradeSchema = new Schema<IGrade>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    marks: { type: Number, required: true, min: 0, max: 100 },
    grade: { type: String, required: true, enum: ['S', 'A', 'B', 'C', 'D', 'F'] },
    semester: { type: Number, required: true },
    examType: { type: String, enum: ['internal', 'midterm', 'final'], default: 'internal' },
    gradedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    gradedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Compound index — one grade per student per course per exam type
gradeSchema.index({ studentId: 1, courseId: 1, examType: 1 }, { unique: true });

// Auto-calculate grade before saving
gradeSchema.pre<IGrade>('save', function (next) {
  if (this.marks >= 90) this.grade = 'S';
  else if (this.marks >= 80) this.grade = 'A';
  else if (this.marks >= 70) this.grade = 'B';
  else if (this.marks >= 60) this.grade = 'C';
  else if (this.marks >= 50) this.grade = 'D';
  else this.grade = 'F';
  next();
});

export const Grade = mongoose.model<IGrade>('Grade', gradeSchema);
