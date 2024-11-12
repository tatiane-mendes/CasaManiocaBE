import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthController } from './controller';
import { LogInterceptor } from './flow';
import { configProvider, LoggerService, PrismaService } from './provider';
import { JwtService } from './security/jwt.service';
import { EmailService } from './service';
import { mailerConfig } from './provider/mailer.config';

@Module({
    imports: [
        TerminusModule,
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get<string>('JWT_SECRET'),
              signOptions: {
                expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
                issuer: configService.get<string>('JWT_ISSUER'),
              },
            }),
            inject: [ConfigService],
          }),
        mailerConfig
    ],
    providers: [
        configProvider,
        LoggerService,
        LogInterceptor,
        PrismaService,
        JwtService,
        EmailService
    ],
    exports: [
        configProvider,
        LoggerService,
        LogInterceptor,
        PrismaService,
        JwtService,
        EmailService
    ],
    controllers: [
        HealthController
    ],
    
})
export class CommonModule {}
