import { ApiProperty } from '@nestjs/swagger';
import { Inventory } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class InventoryOutput {

    @ApiProperty({ description: 'Product unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'Name', example: 'Pastel' })
    public readonly name: string;

    @ApiProperty({ description: 'Quantity', example: '1.22' })
    public readonly quantity: Decimal;

    @ApiProperty({ description: 'Price', example: '5.99' })
    public readonly price: Decimal;

    @ApiProperty({ description: 'Category', example: 'Food' })
    public readonly category: string;

    @ApiProperty({ description: 'Restock level', example: '1.78' })
    public readonly restockLevel: Decimal;

    @ApiProperty({ description: 'Restock quantity', example: '1.54' })
    public readonly restockQuantity: Decimal;

    public constructor(entity: Inventory) {
        this.id = entity.id;
        this.name = entity.name;
        this.quantity = entity.quantity;
        this.price = entity.price;
        this.category = entity.category;
        this.restockLevel = entity.restockLevel;
        this.restockQuantity = entity.restockQuantity;
    }
}
