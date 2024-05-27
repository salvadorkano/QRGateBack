import { Request, Response } from 'express';
import AppResponse from '../../helpers/responses/http-response.responses';
import { HttpStatus } from '../../helpers/enums/http-status.enum';
import QRServices from '../../services/qrs/qr.service';

class QRController {
    async createQR(req: Request, res: Response) {
        try {
            const { body } = req;
            const qrResponse = await QRServices.createQR(body);
            return new AppResponse(HttpStatus.CREATED, qrResponse, res);
        } catch (error) {}
    }

    async getQRByUsername(req: Request, res: Response) {
        const { username } = req.params;
        const user = await QRServices.getQRByUsername(username);
        return new AppResponse(HttpStatus.OK, user, res);
    }

    async getQRByCustodian(req: Request, res: Response) {
        const { username } = req.params;
        const user = await QRServices.getQRByCustodian(username);
        return new AppResponse(HttpStatus.OK, user, res);
    }

    async updateQR(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req;
        const userResponse = await QRServices.updateQR(id, body);
        if (!userResponse.success) {
            return new AppResponse(
                HttpStatus.NOT_FOUND,
                { message: userResponse.message },
                res
            );
        }

        return new AppResponse(HttpStatus.OK, userResponse, res);
    }
}

export default QRController;
