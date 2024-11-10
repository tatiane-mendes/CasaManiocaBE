import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { RecipeOutput, RecipeInput, RecipeData } from '../model';
import { InventoryService } from '../../inventory/service';
import { IngredientService } from '../../ingredient/service';

@Injectable()
export class RecipeService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly ingredientService: IngredientService,
        private readonly inventoryService: InventoryService
    ) { }

    /**
     * Find all recipes in the database
     *
     * @returns A recipe list
     */
    public async find(): Promise<RecipeOutput[]> {

        const entities = await this.prismaService.recipe.findMany({});

        const list = await Promise.all(
            entities.map(async entity => this.returnOutput(entity))
        );
        
        return list;
    }

    /**
     * Find recipe by id in the database
     *
     * @returns A recipe list
     */
    public async findId(id: number): Promise<RecipeOutput> {
        
        const entity = await this.prismaService.recipe.findUnique({ where: { id: +id} }) as RecipeData;

        return this.returnOutput(entity);
    }

    private async returnOutput(entity: RecipeData): Promise<RecipeOutput> {
        return new RecipeOutput(entity, 
            await this.ingredientService.findId(entity.ingredientId), 
            await this.inventoryService.findId(entity.productId));
    }

    /**
     * Create a new recipe record
     *
     * @param data recipe details
     * @returns A recipe created in the database
     */
    public async create(data: RecipeInput): Promise<RecipeOutput> {

        const entity = await this.prismaService.recipe.create({
            data
        });

        return this.returnOutput(entity);
    }

    /**
     * Update a recipe record
     *
     * @param data recipe details
     * @returns A recipe updated in the database
     */
    public async update(data: RecipeInput): Promise<RecipeOutput> {

        const entity = await this.prismaService.recipe.update({
            data,
            where: { id: data.id }
        });

        return this.returnOutput(entity);
    }

    /**
     * Delete a recipe record
     *
     * @param data recipe id
     * @returns A recipe deleted in the database
     */
    public async delete(id: number): Promise<RecipeOutput> {

        const entity = await this.prismaService.recipe.delete({
            where: { id }
        });

        return this.returnOutput(entity);
    }
}