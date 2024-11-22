import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { ProductionOutput, ProductionInput } from '../model';
import { ProductionData } from '../model/production.data';
import { InventoryService } from '../../inventory/service';
import { Decimal } from '@prisma/client/runtime/library';
import { RecipeService } from '../../recipe/service';
import { IngredientService } from '../../ingredient/service';

@Injectable()
export class ProductionService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly inventoryService: InventoryService,
        private readonly recipeService: RecipeService,
        private readonly ingredientService: IngredientService
    ) { }

    /**
     * Find all productions in the database
     *
     * @returns A production list
     */
    public async find(): Promise<ProductionOutput[]> {

        const entities = await this.prismaService.production.findMany({});

        const list = await Promise.all(
            entities.map(async entity => this.returnOutput(entity))
        );
        
        return list;
    }

    /**
     * Find production by id in the database
     *
     * @returns A production list
     */
    public async findId(id: number): Promise<ProductionOutput> {
        
        const entity = await this.prismaService.production.findUnique({ where: { id: +id} }) as ProductionData;

        return this.returnOutput(entity);
    }

    private async returnOutput(entity: ProductionData): Promise<ProductionOutput> {
        return new ProductionOutput(entity, 
            await this.inventoryService.findId(entity.productId));
    }

    /**
     * Create a new production record
     *
     * @param data production details
     * @returns A production created in the database
     */
    public async create(data: ProductionInput): Promise<ProductionOutput> {

        const newData = await this.moveStockInInventoryAndIngredientsToProduction(data, data.quantityProduced, true);

        const entity = await this.prismaService.production.create({
            data: newData,
        });

        return this.returnOutput(entity);
    }

    /**
     * Update a production record
     *
     * @param data production details
     * @returns A production updated in the database
     */
    public async update(data: ProductionInput): Promise<ProductionOutput> {

        const quantityProduced = await this.recalculateQuantityProducedByThisProduction(data.id, data.quantityProduced);
        
        const updateData = await this.moveStockInInventoryAndIngredientsToProduction(data, quantityProduced, true);

        const entity = await this.prismaService.production.update({
            data: updateData,
            where: { id: data.id }
        });

        return this.returnOutput(entity);
    }

    /**
     * Delete a production record
     *
     * @param data production data
     * @returns A production deleted in the database
     */
    public async delete(data: ProductionInput): Promise<ProductionOutput> {

        await this.moveStockInInventoryAndIngredientsToProduction(data, data.quantityProduced, false);

        const entity = await this.prismaService.production.delete({
            where: { id: data.id }
        });

        return this.returnOutput(entity);
    }

    private async recalculateQuantityProducedByThisProduction(id: number, quantityProduced: Decimal): Promise<Decimal> {
        const productionBeforeUpdate = await this.findId(id);

        return new Decimal(Number(quantityProduced) - Number(productionBeforeUpdate.quantityProduced));
    }

    private async moveStockInInventoryAndIngredientsToProduction(data: ProductionInput, quantityProduced: Decimal, addOrMinus: boolean): Promise<ProductionData> {
        const postProductionStock = await this.inventoryService.calculateQuantityInventory(quantityProduced, data.productId, addOrMinus);
        
        await this.calculateQuantityIngredientByProductRecipe(data.productId, quantityProduced, !addOrMinus);

        const newData = new ProductionData({...data, postProductionStock: postProductionStock });

        return newData;
    }

    private async calculateQuantityIngredientByProductRecipe(inventoryId: number, quantityProduced: Decimal, addOrMinus: boolean) {
        const recipes = await this.recipeService.findIdByInventory(inventoryId);

        recipes.forEach(async recipe => {
            const quantityCalculatedPerUnit = new Decimal(Number(recipe.quantityPerUnit) * Number(quantityProduced));
            await this.ingredientService.calculateStockQuantityIngredient(quantityCalculatedPerUnit, recipe.ingredient.id, addOrMinus);
        });

    }
}