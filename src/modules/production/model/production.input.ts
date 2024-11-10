import { PickType } from '@nestjs/swagger';
import { ProductionData } from './production.data';

export class ProductionInput extends PickType(ProductionData, ['id', 'quantityProduced', 'productId', 'productionDate', 'postProductionStock'] as const) {}
