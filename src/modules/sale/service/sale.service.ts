import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { SaleOutput, SaleInput, SaleData } from '../model';
import { InventoryService } from '../../inventory/service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class SaleService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly inventoryService: InventoryService
    ) { }

    /**
     * Find all sales in the database
     *
     * @returns A sale list
     */
    public async find(): Promise<SaleOutput[]> {

        const entities = await this.prismaService.sale.findMany({});

        const list = await Promise.all(
            entities.map(async entity => this.returnOutput(entity))
        );
        
        return list;
    }

    /**
     * Find sale by id in the database
     *
     * @returns A sale list
     */
    public async findId(id: number): Promise<SaleOutput> {
        
        const entity = await this.prismaService.sale.findUnique({ where: { id: +id} }) as SaleData;

        return this.returnOutput(entity);
    }

    private async returnOutput(entity: SaleData): Promise<SaleOutput> {
        return new SaleOutput(entity, 
            await this.inventoryService.findId(entity.productId));
    }

    /**
     * Create a new sale record
     *
     * @param data sale details
     * @returns A sale created in the database
     */
    public async create(data: SaleInput): Promise<SaleOutput> {

        await this.inventoryService.calculateQuantityInventory(data.quantitySold, data.productId, false);

        const entity = await this.prismaService.sale.create({
            data
        });

        return this.returnOutput(entity);
    }

    /**
     * Update a sale record
     *
     * @param data sale details
     * @returns A sale updated in the database
     */
    public async update(data: SaleInput): Promise<SaleOutput> {

        const productionBeforeUpdate = await this.findId(data.id);

        const quantityProduced = new Decimal(Number(data.quantitySold) - Number(productionBeforeUpdate.quantitySold));
        
        await this.inventoryService.calculateQuantityInventory(quantityProduced, data.productId, false);

        const entity = await this.prismaService.sale.update({
            data,
            where: { id: data.id }
        });

        return this.returnOutput(entity);
    }

    /**
     * Delete a sale record
     *
     * @param data sale id
     * @returns A sale deleted in the database
     */
    public async delete(data: SaleInput): Promise<SaleOutput> {

        await this.inventoryService.calculateQuantityInventory(data.quantitySold, data.productId, true);

        const entity = await this.prismaService.sale.delete({
            where: { id: data.id }
        });

        return this.returnOutput(entity);
    }
}