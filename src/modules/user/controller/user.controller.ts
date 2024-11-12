import { Body, Controller, Get, HttpStatus, Post, Put, Delete, UseGuards, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { EmailService, LoggerService, RestrictedGuard } from '../../common';

import { UserPipe } from '../flow';
import { UserData, UserInput } from '../model';
import { UserService } from '../service';

@Controller('users')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {

    public constructor(
        private readonly userService: UserService,
        private readonly logger: LoggerService,
        private readonly emailService: EmailService
    ) { }

    @Get()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find users' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: UserData })
    public async find(): Promise<UserData[]> {

        return this.userService.find();
    }

    @Get(':id')
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Find user' })
    @ApiResponse({ status: HttpStatus.OK, isArray: true, type: UserData })
    public async findId(@Param('id') id: number): Promise<UserData> {

        return this.userService.findId(id);
    }

    @Post()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: HttpStatus.CREATED, type: UserData })
    public async create(@Body(UserPipe) input: UserInput): Promise<UserData> {

        const user = await this.userService.create(input);
        this.logger.info(`Created new user with ID ${user.id}`);

        return user;
    }

    @Put()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: HttpStatus.OK, type: UserData })
    public async update(@Body(UserPipe) input: UserInput): Promise<UserData> {

        const user = await this.userService.update(input);
        this.logger.info(`Updated the user with ID ${user.id}`);

        await this.emailService.sendRecoveryNewPassword(user);

        return user;
    }

    @Delete()
    @UseGuards(RestrictedGuard)
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: HttpStatus.OK, type: UserData })
    public async delete(@Body(UserPipe) input: UserInput): Promise<UserData> {

        const user = await this.userService.delete(input.id);
        this.logger.info(`Deleted the user with ID ${user.id}`);

        return user;
    }
}