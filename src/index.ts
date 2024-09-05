import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from './middlewares/errorHandler';
import initDB from './utils/dbInit';
import LaunchRoute from './routes/launch.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// initDB();

const launchRoute = new LaunchRoute();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', launchRoute.router);
app.use(errorHandlerMiddleware);

(async () => {
    try {
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    } catch (error) {

    }
})()