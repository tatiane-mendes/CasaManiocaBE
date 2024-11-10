import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { ProductionInput } from '../model';

export class ProductionPipe extends JoiValidationPipe {

    public constructor () {
        super();
    }
    
    public buildSchema(): Joi.Schema {

        return Joi.object<ProductionInput>({
            id: Joi.number().optional(),
            quantityProduced: Joi.number().required(),
            productId: Joi.number().required(),
            productionDate: Joi.date().optional(),
            postProductionStock: Joi.number().required()
        });
    }
}