import { Request, Response } from 'express';
import AppResponse from '../../helpers/responses/http-response.responses';
import { HttpStatus } from '../../helpers/enums/http-status.enum';
import { UsersService } from '../../services/users/users.service';

class UsersController {
    private service: UsersService;

    constructor() {
        this.service = new UsersService();
    }

    async createUser(req: Request) {
        const { body } = req;
        const user = await this.service.createUser(body);
        return new AppResponse(HttpStatus.CREATED, user);
    }

    async getUser(req: Request) {
        const { id } = req.params;
        const user = await this.service.getUser(id);
        return new AppResponse(HttpStatus.OK, user);
    }

    async updateUser(req: Request) {
        const { id } = req.params;
        const { body } = req;

        await this.service.updateUser(id, body);
        return new AppResponse(HttpStatus.NO_CONTENT, {});
    }

    async deleteUser(req: Request) {
        const { id} = req.params;

        await this.service.deleteUser(id);
        return new AppResponse(HttpStatus.NO_CONTENT, {});
    }
}

export default UsersController;
