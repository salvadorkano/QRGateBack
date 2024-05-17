import { Request, Response } from 'express';
import AppResponse from '../../helpers/responses/http-response.responses';
import { HttpStatus } from '../../helpers/enums/http-status.enum';
import QRServices from '../../services/qrs/qr.service';

class QRController {
    async createQR(req: Request, res: Response) {
        const { body } = req;
        const user = await QRServices.createQR(body);
        return new AppResponse(HttpStatus.CREATED, user, res);
    }

    async getQRByUsername(req: Request, res: Response) {
        const { username } = req.params;
        console.log('req.params', req.params);

        const user = await QRServices.getQRByUsername(username);
        return new AppResponse(HttpStatus.OK, user, res);
    }

    // async getUser(req: Request, res: Response) {
    //     const { id } = req.params;
    //     const user = await UsersService.getUser(id);
    //     return new AppResponse(HttpStatus.OK, user, res);
    // }

    // async updateUser(req: Request, res: Response) {
    //     const { id } = req.params;
    //     const { body } = req;

    //     await UsersService.updateUser(id, body);
    //     return new AppResponse(HttpStatus.NO_CONTENT, {}, res);
    // }

    // async deleteUser(req: Request, res: Response) {
    //     const { id } = req.params;

    //     await UsersService.deleteUser(id);
    //     return new AppResponse(HttpStatus.NO_CONTENT, {}, res);
    // }
}

export default QRController;
