import { Router } from 'express';
import usersRouter from './users';
import authRouter from './auth';
import qrRouter from './qr';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/qr', qrRouter);

export default router;
