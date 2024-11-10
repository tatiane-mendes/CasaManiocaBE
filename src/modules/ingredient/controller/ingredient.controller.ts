import { Body, Controller, Get, HttpStatus, Post, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggerService, RestrictedGuard } from '../../common';

import { IngredientPipe } from '../flow';
import { IngredientInput, IngredientOutput } from '../model';
import { IngredientService } from '../service';

@Controller('ingredients')
@ApiTags('ingredient')
@ApiBearerAuth()
export class IngredientController {

    public constructor(
        private readonly ingredientService: IngredientService,
        private readonly logger: LoggerService
    ) { }

    @Get()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find ingredients' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: IngredientOutput })
    public async find(): Promise<IngredientOutput[]> {

        return this.ingredientService.find();
    }

    @Get(':id')
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find ingredient' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: IngredientOutput })
    public async findId(@Param('id') id: number): Promise<IngredientOutput> {

        return this.ingredientService.findId(id);
    }

    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Create ingredient' })
    @ApiResponse({ status: HttpStatus.CREATED, type: IngredientOutput })
    public async create(@Body(IngredientPipe) input: IngredientInput): Promise<IngredientOutput> {

        const entity = await this.ingredientService.create(input);
        this.logger.info(`Created new ingredient with ID ${entity.id}`);

        return entity;
    }

    @Put()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update ingredient' })
    @ApiResponse({ status: HttpStatus.OK, type: IngredientOutput })
    public async update(@Body(IngredientPipe) input: IngredientInput): Promise<IngredientOutput> {

        const entity = await this.ingredientService.update(input);
        this.logger.info(`Updated the ingredient with ID ${entity.id}`);

        return entity;
    }

    @Delete()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Delete ingredient' })
    @ApiResponse({ status: HttpStatus.OK, type: IngredientOutput })
    public async delete(@Body(IngredientPipe) input: IngredientInput): Promise<IngredientOutput> {

        const entity = await this.ingredientService.delete(input.id);
        this.logger.info(`Deleted the ingredient with ID ${entity.id}`);

        return entity;
    }
}