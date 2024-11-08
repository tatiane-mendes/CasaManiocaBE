import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../common';
import { UserData, UserInput, UserOutput } from '../model';

@Injectable()
export class UserService {

    public constructor(
        private readonly prismaService: PrismaService
    ) { }

    /**
     * Find all users in the database
     *
     * @returns A user list
     */
    public async find(): Promise<UserData[]> {

        const users = await this.prismaService.user.findMany({});

        return users.map(user => new UserData(user));
    }

    /**
     * Find user by id in the database
     *
     * @returns A user list
     */
    public async findId(id: number): Promise<UserData> {
        
        const user = await this.prismaService.user.findUnique({ where: { id: +id} });

        return new UserData(user as any);
    }

    /**
     * Find user by email and password in the database
     *
     * @returns If the user exist
     */
    public async findEmailAndPassword(email: string, password: string): Promise<UserOutput | null> {
        
        const user = await this.prismaService.user.findFirst({ where: { email: email, password: password} });

        return user != null ? new UserOutput(user) : null;
    }

    /**
     * Create a new user record
     *
     * @param data User details
     * @returns A user created in the database
     */
    public async create(data: UserInput): Promise<UserData> {

        const user = await this.prismaService.user.create({
            data
        });

        return new UserData(user);
    }

    /**
     * Update a user record
     *
     * @param data User details
     * @returns A user updated in the database
     */
    public async update(data: UserInput): Promise<UserData> {

        const user = await this.prismaService.user.update({
            data,
            where: { id: data.id }
        });

        return new UserData(user);
    }

    /**
     * Delete a user record
     *
     * @param data User id
     * @returns A user deleted in the database
     */
    public async delete(id: number): Promise<UserData> {

        const user = await this.prismaService.user.delete({
            where: { id }
        });

        return new UserData(user);
    }
}