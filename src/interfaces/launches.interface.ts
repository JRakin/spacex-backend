import { Request } from "express";

export interface ILaunch {
    flight_number: number,
    name: string,
    date_utc: Date,
}

export interface LaunchRequest extends Request {
    body: ILaunch;
  }