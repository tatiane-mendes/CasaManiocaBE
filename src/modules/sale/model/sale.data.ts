import { ApiProperty } from '@nestjs/swagger';
import { Sale } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class SaleData {

    @ApiProperty({ description: 'Sale unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'Quantity sold', example: '1.64' })
    public readonly quantitySold: Decimal;

    @ApiProperty({ description: 'Id of the product', example: '1' })
    public readonly productId: number;

    @ApiProperty({ description: 'Sale date', example: '31/12/2000' })
    public readonly saleDate: Date;

    public constructor(entity: Sale) {
        this.id = entity.id;
        this.quantitySold = entity.quantitySold;
        this.productId = entity.productId;
        this.saleDate = entity.saleDate;
    }
}
