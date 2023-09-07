import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { TeamsRepository } from './repositories/teams.repositories';
import { ProcessesRepository } from './repositories/processes.repositories';
import { SubProcessesRepository } from './repositories/subProcesses.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    TeamsRepository,
    ProcessesRepository,
    SubProcessesRepository,
  ],
  exports: [
    UsersRepository,
    TeamsRepository,
    ProcessesRepository,
    SubProcessesRepository,
  ],
})
export class DatabaseModule {}
