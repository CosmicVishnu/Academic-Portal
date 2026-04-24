import mongoose, { Schema } from 'mongoose';
import { User, IUser, UserClass } from './User';

// ─── OOP Class: Faculty extends User ─────────────────────────────────────────
export class FacultyClass extends UserClass {
  employeeId: string;
  courses: string[];

  constructor(
    id: string, name: string, email: string,
    employeeId: string, department: string, courses: string[] = []
  ) {
    super(id, name, email, 'faculty');
    this.employeeId = employeeId;
    this.department = department;
    this.courses = courses;
  }

  addCourse(courseId: string): void {
    if (!this.courses.includes(courseId)) {
      this.courses.push(courseId);
    }
  }

  removeCourse(courseId: string): void {
    this.courses = this.courses.filter(c => c !== courseId);
  }
}

// ─── Mongoose Document Interface ─────────────────────────────────────────────
export interface IFaculty extends IUser {
  employeeId: string;
  courses: mongoose.Types.ObjectId[];
}

// ─── Mongoose Discriminator Schema ───────────────────────────────────────────
const facultySchema = new Schema<IFaculty>({
  employeeId: { type: String, required: true, unique: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

export const Faculty = User.discriminator<IFaculty>('faculty', facultySchema);
