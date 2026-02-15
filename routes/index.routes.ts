import { Router } from 'express';
const router = Router();

// Imports
import authRoutes from './auth.routes';
import todoRoutes from './todo.routes';

// Endpoints
router.use('/auth', authRoutes);
router.use('/todo', todoRoutes)

export default router;