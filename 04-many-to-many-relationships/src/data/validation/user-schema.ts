import Joi, { string, ObjectSchema } from 'joi';

const loginRegExp: RegExp = /^[a-zA-Z0-9]{3,30}$/;
const passwordRegExp: RegExp = /^[a-zA-Z0-9]{4,32}$/;
const getAgeSchema = () => Joi.number().integer().min(4).max(130);

export const userUpdateSchema: ObjectSchema = Joi.object().keys({
    id: Joi.string().optional(),
    login: Joi.string().regex(loginRegExp).optional(),
    password: string().regex(passwordRegExp).optional(),
    age: getAgeSchema().optional()
});

export const userCreateSchema: ObjectSchema = Joi.object().keys({
    login: Joi.string().regex(loginRegExp).required(),
    password: string().regex(passwordRegExp).required(),
    age: getAgeSchema().required()
});
