import { Test, TestingModule } from '@nestjs/testing';
import { SubProcessesController } from './sub-processes.controller';
import { SubProcessesService } from './sub-processes.service';

describe('SubProcessesController', () => {
  let controller: SubProcessesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubProcessesController],
      providers: [SubProcessesService],
    }).compile();

    controller = module.get<SubProcessesController>(SubProcessesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
