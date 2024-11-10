import { ApiProperty } from '@nestjs/swagger';
import { ProductionIngredient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class ProductionIngredientData {

    public static readonly UNITOFMEASURE_LENGTH = 50;

    @ApiProperty({ description: 'Production ingredient unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'Id of the ingredient', example: '1' })
    public readonly ingredientId: number;

    @ApiProperty({ description: 'Id of the production', example: '1' })
    public readonly productionId: number;

    @ApiProperty({ description: 'Sale date', example: '31/12/2000' })
    public readonly saleDate: Date;

    @ApiProperty({ description: 'Quantity needed', example: '2.48' })
    public readonly quantityNeeded: Decimal;

    @ApiProperty({ description: 'Unit of measure', example: 'Unit' })
    public readonly unitOfMeasure: string;

    public constructor(entity: ProductionIngredient) {
        this.id = entity.id;
        this.ingredientId = entity.ingredientId;
        this.productionId = entity.productionId;
        this.saleDate = entity.saleDate;
        this.quantityNeeded = entity.quantityNeeded;
        this.unitOfMeasure = entity.unitOfMeasure;
    }
}
