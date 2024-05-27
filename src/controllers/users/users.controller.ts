import { Request, Response } from 'express';
import AppResponse from '../../helpers/responses/http-response.responses';
import { HttpStatus } from '../../helpers/enums/http-status.enum';
import UsersService from '../../services/users/users.service';

class UsersController {
    async login(req: Request, res: Response) {
        const { body } = req;
        const result = await UsersService.login(body.username, body.password);
        const response =
            typeof result === 'string' ? { message: result } : result;
        return new AppResponse(HttpStatus.OK, response, res);
    }

    async createUser(req: Request, res: Response) {
        try {
            const { body } = req;
            const userResponse = await UsersService.createUser(body);

            if (!userResponse.success) {
                console.log('BAD_REQUEST', userResponse);
                return new AppResponse(
                    HttpStatus.BAD_REQUEST,
                    { message: userResponse.message },
                    res
                );
            }

            return new AppResponse(HttpStatus.CREATED, userResponse.data, res);
        } catch (error) {
            if (error instanceof Error) {
                return new AppResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    { message: error.message },
                    res
                );
            } else {
                return new AppResponse(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    { message: 'An unexpected error occurred' },
                    res
                );
            }
        }
    }

    async getUser(req: Request, res: Response) {
        const { id } = req.params;
        const userResponse = await UsersService.getUser(id);

        if (!userResponse.success) {
            return new AppResponse(
                HttpStatus.NOT_FOUND,
                { message: userResponse.message },
                res
            );
        }

        return new AppResponse(HttpStatus.OK, userResponse.data, res);
    }

    async getAllUser(req: Request, res: Response) {
        const { id } = req.params;
        const userResponse = await UsersService.getAllUsers();

        if (!userResponse.success) {
            return new AppResponse(
                HttpStatus.NOT_FOUND,
                { message: userResponse.message },
                res
            );
        }

        return new AppResponse(HttpStatus.OK, userResponse.data, res);
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req;
        const userResponse = await UsersService.updateUser(id, body);
        if (!userResponse.success) {
            return new AppResponse(
                HttpStatus.NOT_FOUND,
                { message: userResponse.message },
                res
            );
        }

        return new AppResponse(HttpStatus.OK, userResponse, res);
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        const userResponse = await UsersService.deleteUser(id);

        if (!userResponse.success) {
            return new AppResponse(
                HttpStatus.NOT_FOUND,
                { message: userResponse.message },
                res
            );
        }

        return new AppResponse(HttpStatus.NO_CONTENT, userResponse, res);
    }
}

export default UsersController;
