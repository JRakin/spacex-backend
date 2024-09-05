import { model, Schema, Document } from "mongoose";
import { ILaunch } from "../interfaces/launches.interface";

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

const Flight = model<ILaunch & Document>('Launch', launchSchema);

export default Flight;