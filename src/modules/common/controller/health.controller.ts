import { Controller, Get, UseGuards } from '@nestjs/common';
import { HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';

import { PrismaService } from '../provider';
import { GuestGuard } from '../security/guest.guard';

@Controller('health')
export class HealthController {

    public constructor(
        private readonly health: HealthCheckService,
        private readonly database: PrismaHealthIndicator,
        private readonly prisma: PrismaService
    ) {}

    @Get()
    @UseGuards(GuestGuard)
    public async healthCheck() {
        return this.health.check([
            async () => this.database.pingCheck('database', this.prisma),
            () => ({
                http: {
                    status: 'up',
                    uptime: process.uptime()
                }
            })
        ]);
    }

}
