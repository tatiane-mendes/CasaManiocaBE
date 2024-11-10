import { Sale } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { InventoryOutput } from '../../inventory';
import { ApiProperty } from '@nestjs/swagger';

export class SaleOutput {

    @ApiProperty({ description: 'Sale unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'Quantity sold', example: '1.64' })
    public readonly quantitySold: Decimal;

    @ApiProperty({ description: 'Product information' })
    public readonly product: InventoryOutput;

    @ApiProperty({ description: 'Sale date', example: '31/12/2000' })
    public readonly saleDate: Date;

    public constructor(entity: Sale, inventory: InventoryOutput) {
        this.id = entity.id;
        this.quantitySold = entity.quantitySold;
        this.product = inventory;
        this.saleDate = entity.saleDate;
    }
}
