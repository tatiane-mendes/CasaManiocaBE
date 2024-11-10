import { PickType } from '@nestjs/swagger';
import { RecipeData } from './recipe.data';

export class RecipeInput extends PickType(RecipeData, ['id', 'ingredientId', 'productId', 'quantityPerUnit', 'unitOfMeasure'] as const) {}
