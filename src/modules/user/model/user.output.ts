import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserOutput {

    @ApiProperty({ description: 'User unique ID', example: '36635263' })
    public readonly id: number;

    @ApiProperty({ description: 'First name', example: 'John' })
    public readonly firstName: string;

    @ApiProperty({ description: 'Last name', example: 'Doe' })
    public readonly lastName: string;

    @ApiProperty({ description: 'Email', example: 'john.doe@example.com' })
    public readonly email: string;

    public constructor(entity: User) {
        if (entity) {
            this.id = entity.id;
            this.firstName = entity.firstName;
            this.lastName = entity.lastName;
            this.email = entity.email;    
        }
    }
}
