import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserData {

    public static readonly FIRST_NAME_LENGTH = 50;
    public static readonly LAST_NAME_LENGTH = 100;
    public static readonly EMAIL_LENGTH = 100;
    public static readonly PASSWORD_MAX_LENGTH = 30;
    public static readonly PASSWORD_MIN_LENGTH = 6;

    @ApiProperty({ description: 'User unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'First name', example: 'John' })
    public readonly firstName: string;

    @ApiProperty({ description: 'Last name', example: 'Doe' })
    public readonly lastName: string;

    @ApiProperty({ description: 'Email', example: 'john.doe@example.com' })
    public readonly email: string;

    @ApiProperty({ description: 'Password', example: '123&abc' })
    public readonly password: string;

    public constructor(entity: User) {
        this.id = entity.id;
        this.firstName = entity.firstName;
        this.lastName = entity.lastName;
        this.email = entity.email;
        this.password = entity.password;
    }
}
