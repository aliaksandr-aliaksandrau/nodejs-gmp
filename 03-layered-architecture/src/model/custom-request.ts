import { Request } from 'express';

import { User } from '../types/user';

export interface CustomRequest extends Request {
    id?: string;
    user?: User;
}
