import mongoose, { Document, Schema } from 'mongoose';

// ─── OOP Class: Course ────────────────────────────────────────────────────────
export class CourseClass {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  credits: number;
  department: string;

  constructor(
    id: string, name: string, code: string,
    facultyId: string, credits: number, department: string
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.facultyId = facultyId;
    this.credits = credits;
    this.department = department;
  }

  getFullTitle(): string {
    return `${this.code} - ${this.name}`;
  }
}

// ─── Mongoose Document Interface ─────────────────────────────────────────────
export interface ICourse extends Document {
  name: string;
  code: string;
  facultyId: mongoose.Types.ObjectId;
  credits: number;
  department: string;
  description: string;
  semester: number;
  isActive: boolean;
}

// ─── Mongoose Schema ──────────────────────────────────────────────────────────
const courseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    facultyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    credits: { type: Number, required: true, min: 1, max: 6 },
    department: { type: String, required: true },
    description: { type: String, default: '' },
    semester: { type: Number, required: true, min: 1, max: 8 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>('Course', courseSchema);
