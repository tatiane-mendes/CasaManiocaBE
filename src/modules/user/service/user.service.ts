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

        const entities = await this.prismaService.user.findMany({});

        return entities.map(entity => new UserData(entity));
    }

    /**
     * Find user by id in the database
     *
     * @returns A user list
     */
    public async findId(id: number): Promise<UserData> {
        
        const entity = await this.prismaService.user.findUnique({ where: { id: +id} });

        return new UserData(entity as any);
    }

    /**
     * Find user by email and password in the database
     *
     * @returns If the user exist
     */
    public async findEmailAndPassword(email: string, password: string): Promise<UserOutput | null> {
        
        const entity = await this.prismaService.user.findFirst({ where: { email: email, password: password} });

        return entity != null ? new UserOutput(entity) : null;
    }

    /**
     * Create a new user record
     *
     * @param data User details
     * @returns A user created in the database
     */
    public async create(data: UserInput): Promise<UserData> {

        const entity = await this.prismaService.user.create({
            data
        });

        return new UserData(entity);
    }

    /**
     * Update a user record
     *
     * @param data User details
     * @returns A user updated in the database
     */
    public async update(data: UserInput): Promise<UserData> {

        const entity = await this.prismaService.user.update({
            data,
            where: { id: data.id }
        });

        return new UserData(entity);
    }

    /**
     * Delete a user record
     *
     * @param data User id
     * @returns A user deleted in the database
     */
    public async delete(id: number): Promise<UserData> {

        const entity = await this.prismaService.user.delete({
            where: { id }
        });

        return new UserData(entity);
    }
}