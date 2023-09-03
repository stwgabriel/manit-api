import { Module } from '@nestjs/common';
import { SubProcessesService } from './sub-processes.service';
import { SubProcessesController } from './sub-processes.controller';

@Module({
  controllers: [SubProcessesController],
  providers: [SubProcessesService],
})
export class SubProcessesModule {}
