import { Body, Controller, Get, HttpStatus, Post, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggerService, RestrictedGuard } from '../../common';

import { RecipePipe } from '../flow';
import { RecipeOutput, RecipeInput } from '../model';
import { RecipeService } from '../service';

@Controller('recipes')
@ApiTags('recipe')
@ApiBearerAuth()
export class RecipeController {

    public constructor(
        private readonly recipeService: RecipeService,
        private readonly logger: LoggerService
    ) { }

    @Get()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find recipes' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: RecipeOutput })
    public async find(): Promise<RecipeOutput[]> {

        return this.recipeService.find();
    }

    @Get(':id')
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find recipe' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: RecipeOutput })
    public async findId(@Param('id') id: number): Promise<RecipeOutput> {

        return this.recipeService.findId(id);
    }

    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Create recipe' })
    @ApiResponse({ status: HttpStatus.CREATED, type: RecipeOutput })
    public async create(@Body(RecipePipe) input: RecipeInput): Promise<RecipeOutput> {

        const entity = await this.recipeService.create(input);
        this.logger.info(`Created new recipe with ID ${entity.id}`);

        return entity;
    }

    @Put()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update recipe' })
    @ApiResponse({ status: HttpStatus.OK, type: RecipeOutput })
    public async update(@Body(RecipePipe) input: RecipeInput): Promise<RecipeOutput> {

        const entity = await this.recipeService.update(input);
        this.logger.info(`Updated the recipe with ID ${entity.id}`);

        return entity;
    }

    @Delete()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Delete recipe' })
    @ApiResponse({ status: HttpStatus.OK, type: RecipeOutput })
    public async delete(@Body(RecipePipe) input: RecipeInput): Promise<RecipeOutput> {

        const entity = await this.recipeService.delete(input.id);
        this.logger.info(`Deleted the recipe with ID ${entity.id}`);

        return entity;
    }
}