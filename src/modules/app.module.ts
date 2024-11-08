import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { UserModule } from './user';
import { AuthorizationModule } from './authorization';

@Module({
    imports: [
        CommonModule,
        UserModule,
        AuthorizationModule
    ]
})
export class ApplicationModule {}
