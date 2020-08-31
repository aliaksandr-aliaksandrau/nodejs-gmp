import Joi, { string, ObjectSchema } from 'joi';

export const userSchema: ObjectSchema = Joi
    .object()
    .keys({
        id: Joi.string().optional(),
        login: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        password: string().regex(/^[a-zA-Z0-9]{4,32}$/).required(),
        age: Joi.number().integer().min(4).max(130).required(),
        isDeleated: Joi.boolean().required()
    });
