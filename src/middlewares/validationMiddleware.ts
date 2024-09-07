import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const launchValidationSchema = Joi.object({
    flight_number: Joi.number()
        .positive()
        .required()
        .error(() => new Error('Flight number must be a positive number')),
    name: Joi.string()
        .required()
        .error(() => new Error('Launch name must be a string')),
    date_utc: Joi.date()
        .iso()
        .required()
        .error(() => new Error('Launch date must be a valid date')),
});

export const validateLaunchData = (req: Request, res: Response, next: NextFunction) => {
    const { error } = launchValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};
