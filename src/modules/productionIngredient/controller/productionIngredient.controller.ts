import { Body, Controller, Get, HttpStatus, Post, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggerService, RestrictedGuard } from '../../common';

import { ProductionIngredientPipe } from '../flow';
import { ProductionIngredientOutput, ProductionIngredientInput } from '../model';
import { ProductionIngredientService } from '../service';

@Controller('productionIngredients')
@ApiTags('productionIngredient')
@ApiBearerAuth()
export class ProductionIngredientController {

    public constructor(
        private readonly productionIngredientService: ProductionIngredientService,
        private readonly logger: LoggerService
    ) { }

    @Get()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find productionIngredients' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ProductionIngredientOutput })
    public async find(): Promise<ProductionIngredientOutput[]> {

        return this.productionIngredientService.find();
    }

    @Get(':id')
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find productionIngredient' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: ProductionIngredientOutput })
    public async findId(@Param('id') id: number): Promise<ProductionIngredientOutput> {

        return this.productionIngredientService.findId(id);
    }

    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Create productionIngredient' })
    @ApiResponse({ status: HttpStatus.CREATED, type: ProductionIngredientOutput })
    public async create(@Body(ProductionIngredientPipe) input: ProductionIngredientInput): Promise<ProductionIngredientOutput> {

        const entity = await this.productionIngredientService.create(input);
        this.logger.info(`Created new productionIngredient with ID ${entity.id}`);

        return entity;
    }

    @Put()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update productionIngredient' })
    @ApiResponse({ status: HttpStatus.OK, type: ProductionIngredientOutput })
    public async update(@Body(ProductionIngredientPipe) input: ProductionIngredientInput): Promise<ProductionIngredientOutput> {

        const entity = await this.productionIngredientService.update(input);
        this.logger.info(`Updated the productionIngredient with ID ${entity.id}`);

        return entity;
    }

    @Delete()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Delete productionIngredient' })
    @ApiResponse({ status: HttpStatus.OK, type: ProductionIngredientOutput })
    public async delete(@Body(ProductionIngredientPipe) input: ProductionIngredientInput): Promise<ProductionIngredientOutput> {

        const entity = await this.productionIngredientService.delete(input.id);
        this.logger.info(`Deleted the productionIngredient with ID ${entity.id}`);

        return entity;
    }
}