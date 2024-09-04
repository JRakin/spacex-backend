"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("../utils/customError"));
const errorHandlerMiddleware = (err, req, res, next) => {
    const status = err instanceof customError_1.default ? err.status : 500;
    const message = err.message || "Internal Server Error";
    const errorResponse = { message, status };
    res.status(status).send(errorResponse);
};
exports.default = errorHandlerMiddleware;
