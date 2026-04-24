import mongoose, { Schema } from 'mongoose';
import { User, IUser, UserClass } from './User';

// ─── OOP Class: Admin extends User ───────────────────────────────────────────
export class AdminClass extends UserClass {
  constructor(id: string, name: string, email: string) {
    super(id, name, email, 'admin');
  }
}

// ─── Mongoose Document Interface ─────────────────────────────────────────────
export interface IAdmin extends IUser {
  // No extra fields — admin inherits everything from User
}

// ─── Mongoose Discriminator Schema ───────────────────────────────────────────
// Empty schema since admins don't have extra fields beyond the base User
const adminSchema = new Schema<IAdmin>({});

export const Admin = User.discriminator<IAdmin>('admin', adminSchema);
