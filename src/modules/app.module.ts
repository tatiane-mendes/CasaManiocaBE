import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { UserModule } from './user';
import { AuthorizationModule } from './authorization';
import { InventoryModule } from './inventory';
import { IngredientModule } from './ingredient';
import { SaleModule } from './sale';
import { ProductionModule } from './production';
import { ProductionIngredientModule } from './productionIngredient';
import { RecipeModule } from './recipe';

@Module({
    imports: [
        CommonModule,
        UserModule,
        AuthorizationModule,
        InventoryModule,
        IngredientModule,
        SaleModule,
        ProductionModule,
        ProductionIngredientModule,
        RecipeModule
    ]
})
export class ApplicationModule {}
