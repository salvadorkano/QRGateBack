import { Router } from 'express';
import UsersController from '../../controllers/users/users.controller';

const router = Router();

const userController = new UsersController(); 

router.post('/login', userController.login);

export default router;