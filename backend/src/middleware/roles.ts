import { Request, Response, NextFunction } from 'express';

/**
 * Role-based access control middleware factory.
 * Usage: router.get('/path', verifyToken, requireRole('admin', 'faculty'), handler)
 *
 * Note: JWT payload stores 'teacher' for faculty (frontend compatibility),
 * so we check for 'teacher' when the DB role is 'faculty'.
 */
export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required.' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Access denied. Required role(s): ${roles.join(', ')}. Your role: ${req.user.role}`,
      });
      return;
    }

    next();
  };
};
