import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { TeamsModule } from 'src/modules/teams/teams.module';
import { DatabaseModule } from 'src/shared/database/database.module';
import { ProcessesModule } from 'src/modules/processes/processes.module';
import { SubProcessesModule } from 'src/modules/sub-processes/sub-processes.module';

import { AuthGuard } from './modules/auth/auth.guard';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TeamsModule,
    ProcessesModule,
    SubProcessesModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
