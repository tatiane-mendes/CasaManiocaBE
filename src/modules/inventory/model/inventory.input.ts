import { PickType } from '@nestjs/swagger';
import { InventoryData } from './inventory.data';

export class InventoryInput extends PickType(InventoryData, ['id', 'name', 'quantity', 'price', 'category', 'restockLevel', 'restockQuantity'] as const) {}
