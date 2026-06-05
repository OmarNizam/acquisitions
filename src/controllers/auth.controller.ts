import type { Request, Response } from 'express';
import { signUp, login, verifyToken } from '../services/auth.service.js';
import { SignUpSchema, LoginSchema } from '../validations/auth.validation.js';
import type { AuthRequest } from '../middleware/auth.middleware.js';

export async function signUpController(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = SignUpSchema.parse(req.body);
    const result = await signUp(validatedData);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: result.user.id,
        email: result.user.email,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Sign up failed';
    res.status(400).json({ error: message });
  }
}

export async function loginController(req: Request, res: Response): Promise<void> {
  try {
    const validatedData = LoginSchema.parse(req.body);
    const result = await login(validatedData);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: result.user.id,
        email: result.user.email,
      },
      token: result.accessToken,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    res.status(401).json({ error: message });
  }
}

export async function meController(req: AuthRequest, res: Response): Promise<void> {
  try {
    const token = req.headers.authorization?.slice(7);

    if (!token) {
      res.status(401).json({ error: 'Missing token' });
      return;
    }

    const { user } = await verifyToken(token);

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch user';
    res.status(401).json({ error: message });
  }
}
