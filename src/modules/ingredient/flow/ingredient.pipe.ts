import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { IngredientData, IngredientInput } from '../model';

export class IngredientPipe extends JoiValidationPipe {

    public constructor () {
        super();
    }
    
    public buildSchema(): Joi.Schema {

        return Joi.object<IngredientInput>({
            id: Joi.number().optional(),
            name: Joi.string().required().max(IngredientData.NAME_LENGTH),
            reorderLevel: Joi.number().required(),
            stockQuantity: Joi.number().required(),
            unitOfMeasure: Joi.string().optional().max(IngredientData.UNITOFMEASURE_LENGTH)
        });
    }
}