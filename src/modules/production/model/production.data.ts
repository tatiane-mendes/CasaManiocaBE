import { ApiProperty } from '@nestjs/swagger';
import { Production } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class ProductionData {

    @ApiProperty({ description: 'Production unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'Quantity produced', example: '1.64' })
    public readonly quantityProduced: Decimal;

    @ApiProperty({ description: 'Id of the product', example: '1' })
    public readonly productId: number;

    @ApiProperty({ description: 'Production date', example: '31/12/2000' })
    public readonly productionDate: Date;

    @ApiProperty({ description: 'Post production stock', example: '2.48' })
    public readonly postProductionStock: Decimal;

    public constructor(entity: Production) {
        this.id = entity.id;
        this.quantityProduced = entity.quantityProduced;
        this.productId = entity.productId;
        this.productionDate = entity.productionDate;
        this.postProductionStock = entity.postProductionStock;
    }
}
