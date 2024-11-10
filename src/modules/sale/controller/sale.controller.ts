import { Body, Controller, Get, HttpStatus, Post, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggerService, RestrictedGuard } from '../../common';

import { SalePipe } from '../flow';
import { SaleOutput, SaleInput } from '../model';
import { SaleService } from '../service';

@Controller('sales')
@ApiTags('sale')
@ApiBearerAuth()
export class SaleController {

    public constructor(
        private readonly saleService: SaleService,
        private readonly logger: LoggerService
    ) { }

    @Get()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find sales' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: SaleOutput })
    public async find(): Promise<SaleOutput[]> {

        return this.saleService.find();
    }

    @Get(':id')
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find sale' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: SaleOutput })
    public async findId(@Param('id') id: number): Promise<SaleOutput> {

        return this.saleService.findId(id);
    }

    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Create sale' })
    @ApiResponse({ status: HttpStatus.CREATED, type: SaleOutput })
    public async create(@Body(SalePipe) input: SaleInput): Promise<SaleOutput> {

        const entity = await this.saleService.create(input);
        this.logger.info(`Created new sale with ID ${entity.id}`);

        return entity;
    }

    @Put()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update sale' })
    @ApiResponse({ status: HttpStatus.OK, type: SaleOutput })
    public async update(@Body(SalePipe) input: SaleInput): Promise<SaleOutput> {

        const entity = await this.saleService.update(input);
        this.logger.info(`Updated the sale with ID ${entity.id}`);

        return entity;
    }

    @Delete()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Delete sale' })
    @ApiResponse({ status: HttpStatus.OK, type: SaleOutput })
    public async delete(@Body(SalePipe) input: SaleInput): Promise<SaleOutput> {

        const entity = await this.saleService.delete(input.id);
        this.logger.info(`Deleted the sale with ID ${entity.id}`);

        return entity;
    }
}