import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { ProductionIngredientController } from './controller';
import { ProductionIngredientService } from './service';
import { ProductionModule } from '../production';
import { IngredientModule } from '../ingredient';

@Module({
    imports: [
        CommonModule,
        IngredientModule,
        ProductionModule
    ],
    providers: [
        ProductionIngredientService
    ],
    controllers: [
        ProductionIngredientController
    ],
    exports: [
        ProductionIngredientService
    ]
})
export class ProductionIngredientModule { }