import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class RecipeData {

    public static readonly UNITOFMEASURE_LENGTH = 50;

    @ApiProperty({ description: 'Recipe unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'Id of the ingredient', example: '1' })
    public readonly ingredientId: number;

    @ApiProperty({ description: 'Id of the product', example: '1' })
    public readonly productId: number;

    @ApiProperty({ description: 'Quantity per unit', example: '2.48' })
    public readonly quantityPerUnit: Decimal;

    @ApiProperty({ description: 'Unit of measure', example: 'Unit' })
    public readonly unitOfMeasure: string;

    public constructor(entity: Recipe) {
        this.id = entity.id;
        this.ingredientId = entity.ingredientId;
        this.productId = entity.productId;
        this.quantityPerUnit = entity.quantityPerUnit;
        this.unitOfMeasure = entity.unitOfMeasure;
    }
}
