import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { InventoryInput, InventoryOutput } from '../model';

@Injectable()
export class InventoryService {

    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    /**
     * Find all inventories in the database
     *
     * @returns A inventory list
     */
    public async find(): Promise<InventoryOutput[]> {

        const entities = await this.prismaService.inventory.findMany({});

        return entities.map(entity => new InventoryOutput(entity));
    }

    /**
     * Find inventory by id in the database
     *
     * @returns A inventory list
     */
    public async findId(id: number): Promise<InventoryOutput> {
        
        const entity = await this.prismaService.inventory.findUnique({ where: { id: +id} });

        return new InventoryOutput(entity as any);
    }

    /**
     * Create a new inventory record
     *
     * @param data Inventory details
     * @returns A inventory created in the database
     */
    public async create(data: InventoryInput): Promise<InventoryOutput> {

        const entity = await this.prismaService.inventory.create({
            data
        });

        return new InventoryOutput(entity);
    }

    /**
     * Update a inventory record
     *
     * @param data Inventory details
     * @returns A inventory updated in the database
     */
    public async update(data: InventoryInput): Promise<InventoryOutput> {

        const entity = await this.prismaService.inventory.update({
            data,
            where: { id: data.id }
        });

        return new InventoryOutput(entity);
    }

    /**
     * Delete a inventory record
     *
     * @param data Inventory id
     * @returns A inventory deleted in the database
     */
    public async delete(id: number): Promise<InventoryOutput> {

        const entity = await this.prismaService.inventory.delete({
            where: { id }
        });

        return new InventoryOutput(entity);
    }
}