import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { UserData, UserInput } from '../model';

export class UserPipe extends JoiValidationPipe {

    public constructor () {
        super();
    }
    
    public buildSchema(): Joi.Schema {

        return Joi.object<UserInput>({
            id: Joi.number().optional(),
            firstName: Joi.string().optional().max(UserData.FIRST_NAME_LENGTH),
            lastName: Joi.string().optional().max(UserData.LAST_NAME_LENGTH),
            email: Joi.string().required().max(UserData.EMAIL_LENGTH),
            password: Joi.string().required().max(UserData.PASSWORD_MAX_LENGTH).min(UserData.PASSWORD_MIN_LENGTH)
        });
    }
}