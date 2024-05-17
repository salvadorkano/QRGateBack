import { Response } from "express";
import { HttpStatus } from "../enums/http-status.enum";


export default class AppResponse {
    constructor(status: HttpStatus, body: any, res: Response) {
        return res.status(status).json({ data: { ...body } });
    }
}