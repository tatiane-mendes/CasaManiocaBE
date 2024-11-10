import { Recipe } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { IngredientOutput } from '../../ingredient';
import { InventoryOutput } from '../../inventory';
import { ApiProperty } from '@nestjs/swagger';

export class RecipeOutput {

    @ApiProperty({ description: 'Recipe unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'Ingredient information' })
    public readonly ingredient: IngredientOutput;

    @ApiProperty({ description: 'Product information' })
    public readonly product: InventoryOutput;

    @ApiProperty({ description: 'Quantity per unit', example: '2.48' })
    public readonly quantityPerUnit: Decimal;

    @ApiProperty({ description: 'Unit of measure', example: 'Unit' })
    public readonly unitOfMeasure: string;

    public constructor(entity: Recipe, ingredient: IngredientOutput, inventory: InventoryOutput) {
        this.id = entity.id;
        this.ingredient = ingredient;
        this.product = inventory;
        this.quantityPerUnit = entity.quantityPerUnit;
        this.unitOfMeasure = entity.unitOfMeasure;
    }
}
