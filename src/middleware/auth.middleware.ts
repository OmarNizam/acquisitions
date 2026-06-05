import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service.js';

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid authorization header' });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const { user } = await verifyToken(token);
    req.userId = user.id;
    req.userEmail = user.email;
    next();
  } catch (error) {
    res.status(401).json({
      error: error instanceof Error ? error.message : 'Unauthorized',
    });
  }
}
