import { HttpStatus } from "../enums/http-status.enum";
import express from 'express';


export default class AppResponse {
    constructor(status: HttpStatus, body: any) {
        return express.response.status(status).json({ data: { ...body } });
    }
}