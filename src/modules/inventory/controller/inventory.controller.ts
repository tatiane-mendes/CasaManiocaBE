import { Body, Controller, Get, HttpStatus, Post, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggerService, RestrictedGuard } from '../../common';

import { InventoryPipe } from '../flow';
import { InventoryOutput, InventoryInput } from '../model';
import { InventoryService } from '../service';

@Controller('inventories')
@ApiTags('inventory')
@ApiBearerAuth()
export class InventoryController {

    public constructor(
        private readonly inventoryService: InventoryService,
        private readonly logger: LoggerService
    ) { }

    @Get()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find inventories' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: InventoryOutput })
    public async find(): Promise<InventoryOutput[]> {

        return this.inventoryService.find();
    }

    @Get(':id')
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find inventory' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: InventoryOutput })
    public async findId(@Param('id') id: number): Promise<InventoryOutput> {

        return this.inventoryService.findId(id);
    }

    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Create inventory' })
    @ApiResponse({ status: HttpStatus.CREATED, type: InventoryOutput })
    public async create(@Body(InventoryPipe) input: InventoryInput): Promise<InventoryOutput> {

        const entity = await this.inventoryService.create(input);
        this.logger.info(`Created new inventory with ID ${entity.id}`);

        return entity;
    }

    @Put()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update inventory' })
    @ApiResponse({ status: HttpStatus.OK, type: InventoryOutput })
    public async update(@Body(InventoryPipe) input: InventoryInput): Promise<InventoryOutput> {

        const entity = await this.inventoryService.update(input);
        this.logger.info(`Updated the inventory with ID ${entity.id}`);

        return entity;
    }

    @Delete()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Delete inventory' })
    @ApiResponse({ status: HttpStatus.OK, type: InventoryOutput })
    public async delete(@Body(InventoryPipe) input: InventoryInput): Promise<InventoryOutput> {

        const entity = await this.inventoryService.delete(input.id);
        this.logger.info(`Deleted the inventory with ID ${entity.id}`);

        return entity;
    }
}