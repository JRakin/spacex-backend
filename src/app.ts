import express, { Application } from "express"
import dotenv from 'dotenv';
import cors from 'cors'
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import initDB from "./utils/dbInit";
import errorHandlerMiddleware from "./middlewares/errorHandler";
import LaunchRoute from './routes/launch.route';

dotenv.config();

class App {
    public app: Application
    public port: number
    private launchRoute = new LaunchRoute();

    constructor(appInit: { port: number }) {
        this.app = express()
        this.port = appInit.port
        initDB();
        this.middlewares()
        this.routes()
    }

    private routes() {
       this.app.use('/', this.launchRoute.router);
    }

    private middlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(errorHandlerMiddleware);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log((`Server listening on the http://localhost:${this.port}`))
        })
    }

}


export default new App({
    port: 8000,
})