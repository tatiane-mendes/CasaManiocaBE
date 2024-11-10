import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { ProductionIngredientOutput, ProductionIngredientInput, ProductionIngredientData } from '../model';
import { IngredientService } from '../../ingredient/service';
import { ProductionService } from '../../production/service/production.service';

@Injectable()
export class ProductionIngredientService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly ingredientService: IngredientService,
        private readonly productionService: ProductionService
    ) { }

    /**
     * Find all production ingredients in the database
     *
     * @returns A production ingredient list
     */
    public async find(): Promise<ProductionIngredientOutput[]> {

        const entities = await this.prismaService.productionIngredient.findMany({});

        const list = await Promise.all(
            entities.map(async entity => this.returnOutput(entity))
        );
        
        return list;
    }

    /**
     * Find production ingredient by id in the database
     *
     * @returns A production ingredient list
     */
    public async findId(id: number): Promise<ProductionIngredientOutput> {
        
        const entity = await this.prismaService.productionIngredient.findUnique({ where: { id: +id} }) as ProductionIngredientData;

        return this.returnOutput(entity);
    }

    private async returnOutput(entity: ProductionIngredientData): Promise<ProductionIngredientOutput> {
        return new ProductionIngredientOutput(entity, 
            await this.ingredientService.findId(entity.ingredientId), 
            await this.productionService.findId(entity.productionId));
    }

    /**
     * Create a new production ingredient record
     *
     * @param data production ingredient details
     * @returns A production ingredient created in the database
     */
    public async create(data: ProductionIngredientInput): Promise<ProductionIngredientOutput> {

        const entity = await this.prismaService.productionIngredient.create({
            data
        });

        return this.returnOutput(entity);
    }

    /**
     * Update a production ingredient record
     *
     * @param data production ingredient details
     * @returns A production ingredient updated in the database
     */
    public async update(data: ProductionIngredientInput): Promise<ProductionIngredientOutput> {

        const entity = await this.prismaService.productionIngredient.update({
            data,
            where: { id: data.id }
        });

        return this.returnOutput(entity);
    }

    /**
     * Delete a production ingredient record
     *
     * @param data production ingredient id
     * @returns A production ingredient deleted in the database
     */
    public async delete(id: number): Promise<ProductionIngredientOutput> {

        const entity = await this.prismaService.productionIngredient.delete({
            where: { id }
        });

        return this.returnOutput(entity);
    }
}