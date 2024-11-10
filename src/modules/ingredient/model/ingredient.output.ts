import { Ingredient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { InventoryOutput } from '../../inventory';
import { ApiProperty } from '@nestjs/swagger';

export class IngredientOutput {

    @ApiProperty({ description: 'Ingredient unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'Name', example: 'Sugar' })
    public readonly name: string;

    @ApiProperty({ description: 'Product information' })
    public readonly product: InventoryOutput;

    @ApiProperty({ description: 'Reorder level', example: '5.99' })
    public readonly reorderLevel: Decimal;

    @ApiProperty({ description: 'Stock quantity', example: '2.64' })
    public readonly stockQuantity: Decimal;

    @ApiProperty({ description: 'Unit of measure', example: 'Unit' })
    public readonly unitOfMeasure: string;

    public constructor(entity: Ingredient, inventory: InventoryOutput) {
        this.id = entity.id;
        this.name = entity.name;
        this.product = inventory;
        this.reorderLevel = entity.reorderLevel;
        this.stockQuantity = entity.stockQuantity;
        this.unitOfMeasure = entity.unitOfMeasure;
    }
}
