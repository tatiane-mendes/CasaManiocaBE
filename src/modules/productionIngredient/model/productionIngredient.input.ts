import { PickType } from '@nestjs/swagger';
import { ProductionIngredientData } from './productionIngredient.data';

export class ProductionIngredientInput extends PickType(ProductionIngredientData, ['id', 'ingredientId', 'productionId', 'quantityNeeded', 'saleDate', 'unitOfMeasure'] as const) {}
