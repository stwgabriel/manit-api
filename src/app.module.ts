import { Module } from '@nestjs/common';

import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { TeamsModule } from 'src/modules/teams/teams.module';
import { ProcessesModule } from 'src/modules/processes/processes.module';
import { SubProcessesModule } from 'src/modules/sub-processes/sub-processes.module';
import { DatabaseModule } from 'src/shared/database/database.module';

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
  providers: [],
})
export class AppModule {}
