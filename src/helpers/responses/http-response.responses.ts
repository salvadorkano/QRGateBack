import { Response } from 'express';
import { HttpStatus } from '../enums/http-status.enum';

class AppResponse {
    constructor(statusCode: number, data: any, res: Response) {
        res.status(statusCode).json({
            status: statusCode,
            data: data,
        });
    }
}

export default AppResponse;
