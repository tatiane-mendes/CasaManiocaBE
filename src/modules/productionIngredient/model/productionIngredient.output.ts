import { ProductionIngredient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { IngredientOutput } from '../../ingredient';
import { ProductionOutput } from '../../production/model/production.output';
import { ApiProperty } from '@nestjs/swagger';

export class ProductionIngredientOutput {

    @ApiProperty({ description: 'Production ingredient unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'Ingredient information' })
    public readonly ingredient: IngredientOutput;

    @ApiProperty({ description: 'Production information' })
    public readonly production: ProductionOutput;

    @ApiProperty({ description: 'Sale date', example: '31/12/2000' })
    public readonly saleDate: Date;

    @ApiProperty({ description: 'Quantity needed', example: '2.48' })
    public readonly quantityNeeded: Decimal;

    @ApiProperty({ description: 'Unit of measure', example: 'Unit' })
    public readonly unitOfMeasure: string;

    public constructor(entity: ProductionIngredient, ingredient: IngredientOutput, production: ProductionOutput) {
        this.id = entity.id;
        this.ingredient = ingredient;
        this.production = production;
        this.saleDate = entity.saleDate;
        this.quantityNeeded = entity.quantityNeeded;
        this.unitOfMeasure = entity.unitOfMeasure;
    }
}
