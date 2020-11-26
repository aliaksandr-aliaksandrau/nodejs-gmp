import Joi, { string, ObjectSchema } from 'joi';

const usernameRegExp: RegExp = /^[a-zA-Z0-9]{3,30}$/;
const passwordRegExp: RegExp = /^[a-zA-Z0-9]{4,32}$/;

export const authenticationSchema: ObjectSchema = Joi.object().keys({
    username: Joi.string().regex(usernameRegExp).required(),
    password: string().regex(passwordRegExp).required()
});
