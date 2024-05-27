import { Router } from 'express';
import UserController from '../../controllers/users/users.controller';

const router = Router();
const userController = new UserController();

router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUser);

export default router;
