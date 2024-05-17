import { Router } from 'express';
import QRController from '../../controllers/qrs/qr.controller';

const router = Router();

const qrController = new QRController();

router.post('/', qrController.createQR);
router.get(
    '/getByUsername/:username',
    qrController.getQRByUsername.bind(qrController)
);

export default router;
