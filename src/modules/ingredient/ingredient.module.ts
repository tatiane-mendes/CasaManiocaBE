import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { IngredientController } from './controller';
import { IngredientService } from './service';
import { InventoryModule } from '../inventory';

@Module({
    imports: [
        CommonModule,
        InventoryModule
    ],
    providers: [
        IngredientService
    ],
    controllers: [
        IngredientController
    ],
    exports: [
        IngredientService
    ]
})
export class IngredientModule { }