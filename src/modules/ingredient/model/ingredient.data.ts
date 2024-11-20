import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class IngredientData {

    public static readonly NAME_LENGTH = 255;
    public static readonly UNITOFMEASURE_LENGTH = 50;

    @ApiProperty({ description: 'Ingredient unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'Name', example: 'Sugar' })
    public readonly name: string;

    @ApiProperty({ description: 'Reorder level', example: '5.99' })
    public readonly reorderLevel: Decimal;

    @ApiProperty({ description: 'Stock quantity', example: '2.64' })
    public readonly stockQuantity: Decimal;

    @ApiProperty({ description: 'Unit of measure', example: 'Unit' })
    public readonly unitOfMeasure: string;

    public constructor(entity: Ingredient) {
        this.id = entity.id;
        this.name = entity.name;
        this.reorderLevel = entity.reorderLevel;
        this.stockQuantity = entity.stockQuantity;
        this.unitOfMeasure = entity.unitOfMeasure;
    }
}
