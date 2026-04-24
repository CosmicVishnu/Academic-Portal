import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Student } from '../models/Student';
import { Faculty } from '../models/Faculty';
import { verifyToken } from '../middleware/auth';

const router = Router();

// Helper: generate JWT — maps 'faculty' role → 'teacher' for frontend compatibility
const generateToken = (user: { _id: unknown; email: string; role: string; name: string }) => {
  const frontendRole = user.role === 'faculty' ? 'teacher' : user.role;
  return jwt.sign(
    { id: user._id, email: user.email, role: frontendRole, name: user.name },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as object
  );
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    // Find user by email (include password field)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    if (!user.isActive) {
      res.status(401).json({ success: false, message: 'Account is deactivated. Contact administrator.' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const token = generateToken(user);

    // Return user without password (toJSON transform handles this)
    res.status(200).json({
      success: true,
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

// ─── POST /api/auth/register ──────────────────────────────────────────────────
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password || !role) {
      res.status(400).json({ success: false, message: 'Name, email, password, and role are required.' });
      return;
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      res.status(409).json({ success: false, message: 'Email already registered.' });
      return;
    }

    // Map 'teacher' from frontend → 'faculty' for DB
    const dbRole = role === 'teacher' ? 'faculty' : role;

    let newUser;
    if (dbRole === 'student') {
      const rollNumber = `CS${Date.now().toString().slice(-5)}`;
      newUser = new Student({ name, email, password, role: 'student', department: department || 'Computer Science', rollNumber, semester: 1 });
    } else if (dbRole === 'faculty') {
      const employeeId = `FAC${Date.now().toString().slice(-5)}`;
      newUser = new Faculty({ name, email, password, role: 'faculty', department: department || 'General', employeeId });
    } else {
      newUser = new User({ name, email, password, role: 'admin', department: 'Administration' });
    }

    await newUser.save();
    const token = generateToken(newUser);

    res.status(201).json({ success: true, token, user: newUser.toJSON() });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
router.get('/me', verifyToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user!.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }
    res.status(200).json({ success: true, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
