import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { RecipeController } from './controller';
import { RecipeService } from './service';
import { IngredientModule } from '../ingredient';
import { InventoryModule } from '../inventory';

@Module({
    imports: [
        CommonModule,
        IngredientModule,
        InventoryModule
    ],
    providers: [
        RecipeService
    ],
    controllers: [
        RecipeController
    ],
    exports: [
        RecipeService
    ]
})
export class RecipeModule { }