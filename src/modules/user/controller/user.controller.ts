import { Body, Controller, Get, HttpStatus, Post, Put, Delete, UseGuards, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoggerService, RestrictedGuard } from '../../common';

import { UserPipe } from '../flow';
import { UserInput, UserOutput } from '../model';
import { UserService } from '../service';

@Controller('users')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {

    public constructor(
        private readonly userService: UserService,
        private readonly logger: LoggerService
    ) { }

    @Get()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find users' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: UserOutput })
    public async find(): Promise<UserOutput[]> {

        return this.userService.find();
    }

    @Get(':id')
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find user' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: UserOutput })
    public async findId(@Param('id') id: number): Promise<UserOutput> {

        return this.userService.findId(id);
    }

    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: HttpStatus.CREATED, type: UserOutput })
    public async create(@Body(UserPipe) input: UserInput): Promise<UserOutput> {

        const user = await this.userService.create(input);
        this.logger.info(`Created new user with ID ${user.id}`);

        return user;
    }

    @Put()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: HttpStatus.OK, type: UserOutput })
    public async update(@Body(UserPipe) input: UserInput): Promise<UserOutput> {

        const user = await this.userService.update(input);
        this.logger.info(`Updated the user with ID ${user.id}`);

        return user;
    }

    @Delete()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: HttpStatus.OK, type: UserOutput })
    public async delete(@Body(UserPipe) input: UserInput): Promise<UserOutput> {

        const user = await this.userService.delete(input.id);
        this.logger.info(`Deleted the user with ID ${user.id}`);

        return user;
    }

    @Put('recorevy-password')
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Recovery password' })
    @ApiResponse({ status: HttpStatus.OK, type: UserOutput })
    public async recoveryPassword(@Query('email') email: string): Promise<UserOutput> {

        const user = await this.userService.recoveryPassword(email);
        this.logger.info(`Recovery password with ID ${user.id}`);

        return user;
    }
}