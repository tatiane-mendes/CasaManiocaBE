import { Body, Controller, Get, HttpStatus, Post, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggerService, RestrictedGuard } from '../../common';

import { ProductionPipe } from '../flow';
import { ProductionOutput, ProductionInput } from '../model';
import { ProductionService } from '../service';

@Controller('productions')
@ApiTags('production')
@ApiBearerAuth()
export class ProductionController {

    public constructor(
        private readonly productionService: ProductionService,
        private readonly logger: LoggerService
    ) { }

    @Get()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find productions' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ProductionOutput })
    public async find(): Promise<ProductionOutput[]> {

        return this.productionService.find();
    }

    @Get(':id')
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find production' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ProductionOutput })
    public async findId(@Param('id') id: number): Promise<ProductionOutput> {

        return this.productionService.findId(id);
    }

    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Create production' })
    @ApiResponse({ status: HttpStatus.CREATED, type: ProductionOutput })
    public async create(@Body(ProductionPipe) input: ProductionInput): Promise<ProductionOutput> {

        const entity = await this.productionService.create(input);
        this.logger.info(`Created new production with ID ${entity.id}`);

        return entity;
    }

    @Put()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update production' })
    @ApiResponse({ status: HttpStatus.OK, type: ProductionOutput })
    public async update(@Body(ProductionPipe) input: ProductionInput): Promise<ProductionOutput> {

        const entity = await this.productionService.update(input);
        this.logger.info(`Updated the production with ID ${entity.id}`);

        return entity;
    }

    @Delete()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Delete production' })
    @ApiResponse({ status: HttpStatus.OK, type: ProductionOutput })
    public async delete(@Body(ProductionPipe) input: ProductionInput): Promise<ProductionOutput> {

        const entity = await this.productionService.delete(input.id);
        this.logger.info(`Deleted the production with ID ${entity.id}`);

        return entity;
    }
}