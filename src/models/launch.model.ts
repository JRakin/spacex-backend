import { model, Schema, Document } from "mongoose";
import { ILaunch } from "../interfaces/launches.interface";

export interface LaunchDocument extends ILaunch, Document {}

const launchSchema: Schema = new Schema({
    flight_number: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date_utc: {
        type: String,
        required: true,
    },
});

const Flight = model<LaunchDocument>('Launch', launchSchema);

export default Flight;