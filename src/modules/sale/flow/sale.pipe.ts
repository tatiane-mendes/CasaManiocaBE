import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { SaleInput } from '../model';

export class SalePipe extends JoiValidationPipe {

    public constructor () {
        super();
    }
    
    public buildSchema(): Joi.Schema {

        return Joi.object<SaleInput>({
            id: Joi.number().optional(),
            quantitySold: Joi.number().required(),
            productId: Joi.number().required(),
            saleDate: Joi.date().optional()
        });
    }
}