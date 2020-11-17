import Joi, { string, ObjectSchema } from 'joi';

const nameRegExp: RegExp = /^[a-zA-Z0-9]{3,30}$/;
const getPermissionsSchema = () =>
    Joi.array().items('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

export const groupUpdateSchema: ObjectSchema = Joi.object().keys({
    id: Joi.string().optional(),
    name: Joi.string().regex(nameRegExp).optional(),
    permissions: getPermissionsSchema().optional()
});

export const groupCreateSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().regex(nameRegExp).required(),
    permissions: getPermissionsSchema().required()
});
