import * as Joi from 'joi';

import { JoiValidationPipe } from '../../common';
import { RecipeData, RecipeInput } from '../model';

export class RecipePipe extends JoiValidationPipe {

    public constructor () {
        super();
    }
    
    public buildSchema(): Joi.Schema {

        return Joi.object<RecipeInput>({
            id: Joi.number().optional(),
            ingredientId: Joi.number().required(),
            productId: Joi.number().required(),
            quantityPerUnit: Joi.number().required(),
            unitOfMeasure: Joi.string().optional().max(RecipeData.UNITOFMEASURE_LENGTH)
        });
    }
}