import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { InventoryData, InventoryInput } from '../model';

export class InventoryPipe extends JoiValidationPipe {

    public constructor () {
        super();
    }
    
    public buildSchema(): Joi.Schema {

        return Joi.object<InventoryInput>({
            id: Joi.number().optional(),
            name: Joi.string().required().max(InventoryData.NAME_LENGTH),
            quantity: Joi.number().required(),
            price: Joi.number().required(),
            category: Joi.string().optional().max(InventoryData.CATEGORY_LENGTH),
            restockLevel: Joi.number().required(),
            restockQuantity: Joi.number().required()
        });
    }
}