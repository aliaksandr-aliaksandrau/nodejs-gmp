import Joi, { string, ObjectSchema } from 'joi';

export const userSchema: ObjectSchema = Joi
    .object()
    .keys({
        id: Joi.string().required(),
        login: Joi.string().required(),
        password: string().required(),
        age: Joi.number().integer(),
        isDeleated: Joi.boolean().required()
    });
