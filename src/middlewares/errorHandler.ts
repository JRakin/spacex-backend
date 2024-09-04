import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import HttpException from "../utils/customError";

interface ErrorResponse {
    message: string;
    status: number;
}

const errorHandlerMiddleware: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err instanceof HttpException ? err.status : 500;
    const message = err.message || "Internal Server Error";
    const errorResponse: ErrorResponse = { message, status };

    res.status(status).send(errorResponse);
};

export default errorHandlerMiddleware;
