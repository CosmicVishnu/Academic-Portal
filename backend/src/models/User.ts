import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// ─── OOP Base Class ───────────────────────────────────────────────────────────
export class UserClass {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  department: string;

  constructor(id: string, name: string, email: string, role: 'student' | 'faculty' | 'admin') {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.department = '';
  }

  getDisplayRole(): string {
    // Map 'faculty' → 'teacher' so existing frontend role strings remain unchanged
    return this.role === 'faculty' ? 'teacher' : this.role;
  }
}

// ─── Mongoose Document Interface ─────────────────────────────────────────────
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'faculty' | 'admin';
  isActive: boolean;
  department: string;
  joinDate: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// ─── Mongoose Schema ──────────────────────────────────────────────────────────
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['student', 'faculty', 'admin'], required: true },
    isActive: { type: Boolean, default: true },
    department: { type: String, default: '' },
    joinDate: { type: Date, default: Date.now },
  },
  { timestamps: true, discriminatorKey: 'role' }
);

// Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method: compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_doc: unknown, ret: any) => {
    delete ret.password;
    // Map faculty role to 'teacher' for frontend compatibility
    if (ret.role === 'faculty') ret.role = 'teacher';
    return ret;
  },
});

export const User = mongoose.model<IUser>('User', userSchema);
