import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { SaleController } from './controller';
import { SaleService } from './service';
import { InventoryModule } from '../inventory';

@Module({
    imports: [
        CommonModule,
        InventoryModule
    ],
    providers: [
        SaleService
    ],
    controllers: [
        SaleController
    ],
    exports: [
        SaleService
    ]
})
export class SaleModule { }