import { PickType } from '@nestjs/swagger';
import { SaleData } from './sale.data';

export class SaleInput extends PickType(SaleData, ['id', 'quantitySold', 'productId', 'saleDate'] as const) {}
