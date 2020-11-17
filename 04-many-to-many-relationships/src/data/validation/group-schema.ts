import Joi, { string, ObjectSchema } from 'joi';

export const groupSchema: ObjectSchema = Joi.object().keys({
    id: Joi.string().optional(),
    name: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    permissions: Joi.array().items(
        'READ',
        'WRITE',
        'DELETE',
        'SHARE',
        'UPLOAD_FILES'
    )
});
