import { model, Schema, Document } from "mongoose";
import { IFlight } from "../interfaces/flights.interface";

const flightSchema: Schema = new Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    flightDate: {
        type: String,
        required: true,
    },
});

const Flight = model<IFlight & Document>('Launch', flightSchema);

export default Flight;