import mongoose, { Schema } from 'mongoose';
import { User, IUser, UserClass } from './User';

// ─── OOP Class: Student extends User ─────────────────────────────────────────
export class StudentClass extends UserClass {
  rollNumber: string;
  semester: number;

  constructor(
    id: string, name: string, email: string,
    rollNumber: string, semester: number, department: string
  ) {
    super(id, name, email, 'student');
    this.rollNumber = rollNumber;
    this.semester = semester;
    this.department = department;
  }

  getSemesterLabel(): string {
    return `Semester ${this.semester}`;
  }
}

// ─── Mongoose Document Interface ─────────────────────────────────────────────
export interface IStudent extends IUser {
  rollNumber: string;
  semester: number;
}

// ─── Mongoose Discriminator Schema ───────────────────────────────────────────
const studentSchema = new Schema<IStudent>({
  rollNumber: { type: String, required: true, unique: true },
  semester: { type: Number, required: true, min: 1, max: 8 },
});

export const Student = User.discriminator<IStudent>('student', studentSchema);
