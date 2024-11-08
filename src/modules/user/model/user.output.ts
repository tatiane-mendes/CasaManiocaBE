import { User } from '@prisma/client';

export class UserOutput {

    public readonly id: number;

    public readonly firstName: string;

    public readonly lastName: string;

    public readonly email: string;

    public constructor(entity: User) {
        this.id = entity.id;
        this.firstName = entity.firstName;
        this.lastName = entity.lastName;
        this.email = entity.email;
    }
}
