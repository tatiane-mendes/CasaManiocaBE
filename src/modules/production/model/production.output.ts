import { Production } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { InventoryOutput } from '../../inventory';
import { ApiProperty } from '@nestjs/swagger';

export class ProductionOutput {

    @ApiProperty({ description: 'Production unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'Quantity produced', example: '1.64' })
    public readonly quantityProduced: Decimal;

    @ApiProperty({ description: 'Product information' })
    public readonly product: InventoryOutput;

    @ApiProperty({ description: 'Production date', example: '31/12/2000' })
    public readonly productionDate: Date;

    @ApiProperty({ description: 'Post production stock', example: '2.48' })
    public readonly postProductionStock: Decimal;

    public constructor(entity: Production, inventory: InventoryOutput) {
        this.id = entity.id;
        this.quantityProduced = entity.quantityProduced;
        this.product = inventory;
        this.productionDate = entity.productionDate;
        this.postProductionStock = entity.postProductionStock;
    }
}
