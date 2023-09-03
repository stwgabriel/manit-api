import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repositories';
import { TeamsRepository } from './repositories/teams.repositories';
import { ProcessRepository } from './repositories/process.repositories';
import { SubProcessRepository } from './repositories/subProcess.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    TeamsRepository,
    ProcessRepository,
    SubProcessRepository,
  ],
  exports: [
    UsersRepository,
    TeamsRepository,
    ProcessRepository,
    SubProcessRepository,
  ],
})
export class DatabaseModule {}
