import { BadRequestException, Injectable } from '@nestjs/common';

import { EmailService, PrismaService } from '../../common';
import { UserData, UserInput, UserOutput } from '../model';

@Injectable()
export class UserService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: EmailService
    ) { }

    /**
     * Find all users in the database
     *
     * @returns A user list
     */
    public async find(): Promise<UserOutput[]> {

        const entities = await this.prismaService.user.findMany({});

        const list = await Promise.all(
            entities.map(async entity => this.returnOutput(entity))
        );
        
        return list;
    }

    /**
     * Find user by id in the database
     *
     * @returns A user list
     */
    public async findId(id: number): Promise<UserOutput> {
        
        const entity = await this.prismaService.user.findUnique({ where: { id: +id} }) as UserData;

        return this.returnOutput(entity);
    }

    private async returnOutput(entity: UserData): Promise<UserOutput> {
        return new UserOutput(entity);
    }

    /**
     * Find user by email and password in the database
     *
     * @returns If the user exist
     */
    public async findEmailAndPassword(email: string, password: string): Promise<UserOutput | null> {
        
        const entity = await this.prismaService.user.findFirst({ where: { email: email, password: password} }) as UserData;

        return this.returnOutput(entity);
    }

    /**
     * Create a new user record
     *
     * @param data User details
     * @returns A user created in the database
     */
    public async create(data: UserInput): Promise<UserOutput> {

        const entity = await this.prismaService.user.create({
            data
        });

        return this.returnOutput(entity);
    }

    /**
     * Update a user record
     *
     * @param data User details
     * @returns A user updated in the database
     */
    public async update(data: UserInput): Promise<UserOutput> {

        const entity = await this.prismaService.user.update({
            data,
            where: { id: data.id }
        });

        return this.returnOutput(entity);
    }

    /**
     * Delete a user record
     *
     * @param data User id
     * @returns A user deleted in the database
     */
    public async delete(id: number): Promise<UserOutput> {

        const entity = await this.prismaService.user.delete({
            where: { id }
        });

        return this.returnOutput(entity);
    }

    /**
     * Recovery password
     *
     * @param data Email
     * @returns A password user updated in the database
     */
    public async recoveryPassword(email: string): Promise<UserOutput | any> {

        let entity = await this.prismaService.user.findFirst({ where: { email: email } });

        if (entity != null) {
            entity.password = this.generateRandomString(8);
            this.update(entity);
            
            await this.emailService.sendRecoveryNewPassword(entity);
            return this.returnOutput(entity);
        }
        else {
            return new BadRequestException(`User ${email} not found`);
        }
    }

    private generateRandomString(length: number): string {
        const characters = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }
}