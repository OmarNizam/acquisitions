import { Router } from 'express';
import {
  signUpController,
  loginController,
  meController,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
router.get('/me', authMiddleware, meController);

export default router;
