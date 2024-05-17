import { Request, Response } from 'express';
import AppResponse from '../../helpers/responses/http-response.responses';
import { HttpStatus } from '../../helpers/enums/http-status.enum';
import UsersService from '../../services/users/users.service';

class UsersController {

    async login(req: Request, res: Response) {
        const {body} =  req;
        const result = await UsersService.login(body.username, body.password);
        const response = typeof result == 'string' ? { message: result } : result;
        return new AppResponse(HttpStatus.CREATED, response, res);
    }

    async createUser(req: Request, res: Response) {
        const { body } = req;
        const user = await UsersService.createUser(body);
        return new AppResponse(HttpStatus.CREATED, user, res);
    }

    async getUser(req: Request, res: Response) {
        const { id } = req.params;
        const user = await UsersService.getUser(id);
        return new AppResponse(HttpStatus.OK, user, res);
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req;

        await UsersService.updateUser(id, body);
        return new AppResponse(HttpStatus.NO_CONTENT, {}, res);
    }

    async deleteUser(req: Request, res: Response) {
        const { id} = req.params;

        await UsersService.deleteUser(id);
        return new AppResponse(HttpStatus.NO_CONTENT, {}, res);
    }
}

export default UsersController;
