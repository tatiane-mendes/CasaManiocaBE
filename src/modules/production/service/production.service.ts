import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { ProductionOutput, ProductionInput } from '../model';
import { ProductionData } from '../model/production.data';
import { InventoryService } from '../../inventory/service';

@Injectable()
export class ProductionService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly inventoryService: InventoryService
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

        const entity = await this.prismaService.production.create({
            data
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

        const entity = await this.prismaService.production.update({
            data,
            where: { id: data.id }
        });

        return this.returnOutput(entity);
    }

    /**
     * Delete a production record
     *
     * @param data production id
     * @returns A production deleted in the database
     */
    public async delete(id: number): Promise<ProductionOutput> {

        const entity = await this.prismaService.production.delete({
            where: { id }
        });

        return this.returnOutput(entity);
    }
}