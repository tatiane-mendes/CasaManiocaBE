import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { ProductionController } from './controller';
import { ProductionService } from './service';
import { InventoryModule } from '../inventory';

@Module({
    imports: [
        CommonModule,
        InventoryModule
    ],
    providers: [
        ProductionService
    ],
    controllers: [
        ProductionController
    ],
    exports: [
        ProductionService
    ]
})
export class ProductionModule { }