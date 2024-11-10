import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { InventoryController } from './controller';
import { InventoryService } from './service';

@Module({
    imports: [
        CommonModule
    ],
    providers: [
        InventoryService
    ],
    controllers: [
        InventoryController
    ],
    exports: [
        InventoryService
    ]
})
export class InventoryModule { }