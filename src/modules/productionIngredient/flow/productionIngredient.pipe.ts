import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { ProductionIngredientData, ProductionIngredientInput } from '../model';

export class ProductionIngredientPipe extends JoiValidationPipe {

    public constructor () {
        super();
    }
    
    public buildSchema(): Joi.Schema {

        return Joi.object<ProductionIngredientInput>({
            id: Joi.number().optional(),
            ingredientId: Joi.number().required(),
            productionId: Joi.number().required(),
            saleDate: Joi.date().optional(),
            quantityNeeded: Joi.number().required(),
            unitOfMeasure: Joi.string().optional().max(ProductionIngredientData.UNITOFMEASURE_LENGTH)
        });
    }
}