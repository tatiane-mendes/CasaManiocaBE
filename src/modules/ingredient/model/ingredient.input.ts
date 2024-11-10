import { PickType } from '@nestjs/swagger';
import { IngredientData } from './ingredient.data';

export class IngredientInput extends PickType(IngredientData, ['id', 'name', 'productId', 'reorderLevel', 'stockQuantity', 'unitOfMeasure'] as const) {}
