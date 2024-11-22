import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { ProductionController } from './controller';
import { ProductionService } from './service';
import { InventoryModule } from '../inventory';
import { IngredientModule } from '../ingredient';
import { RecipeModule } from '../recipe';

@Module({
    imports: [
        CommonModule,
        InventoryModule,
        IngredientModule,
        RecipeModule
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