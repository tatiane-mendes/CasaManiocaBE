import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { IngredientData, IngredientInput, IngredientOutput } from '../model';
import { InventoryService } from '../../inventory/service';

@Injectable()
export class IngredientService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly inventoryService: InventoryService
    ) { }

    /**
     * Find all ingredients in the database
     *
     * @returns A ingredient list
     */
    public async find(): Promise<IngredientOutput[]> {

        const entities = await this.prismaService.ingredient.findMany({});

        const list = await Promise.all(
            entities.map(async entity => this.returnOutput(entity))
        );
        
        return list;
    }

    /**
     * Find ingredient by id in the database
     *
     * @returns A ingredient list
     */
    public async findId(id: number): Promise<IngredientOutput> {
        
        const entity = await this.prismaService.ingredient.findUnique({ where: { id: +id} }) as IngredientData;

        return this.returnOutput(entity);
    }

    private async returnOutput(entity: IngredientData): Promise<IngredientOutput> {
        return new IngredientOutput(entity, 
            await this.inventoryService.findId(entity.productId));
    }

    /**
     * Create a new ingredient record
     *
     * @param data ingredient details
     * @returns A ingredient created in the database
     */
    public async create(data: IngredientInput): Promise<IngredientOutput> {

        const entity = await this.prismaService.ingredient.create({
            data
        });

        return this.returnOutput(entity);
    }

    /**
     * Update a ingredient record
     *
     * @param data ingredient details
     * @returns A ingredient updated in the database
     */
    public async update(data: IngredientInput): Promise<IngredientOutput> {

        const entity = await this.prismaService.ingredient.update({
            data,
            where: { id: data.id }
        });

        return this.returnOutput(entity);
    }

    /**
     * Delete a ingredient record
     *
     * @param data ingredient id
     * @returns A ingredient deleted in the database
     */
    public async delete(id: number): Promise<IngredientOutput> {

        const entity = await this.prismaService.ingredient.delete({
            where: { id }
        });

        return this.returnOutput(entity);
    }
}