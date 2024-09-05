export interface ILaunch {
    _id: string,
    flight_number: Number,
    name: string,
    date_utc: Date,
}

export interface ILaunchResponse {
    flight_number: number,
    name: string,
    date_utc: Date,
}