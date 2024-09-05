"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const launchSchema = new mongoose_1.Schema({
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
const Flight = (0, mongoose_1.model)('Launch', launchSchema);
exports.default = Flight;
