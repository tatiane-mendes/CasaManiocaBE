import { Module } from '@nestjs/common';

import { CommonModule } from '../common';
import { AuthorizationController } from './controller';
import { UserModule } from '../user';

@Module({
    imports: [
        CommonModule,
        UserModule
    ],
    providers: [
    ],
    controllers: [
        AuthorizationController
    ],
    exports: [
    ]
})
export class AuthorizationModule { }