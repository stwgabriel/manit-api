import { Test, TestingModule } from '@nestjs/testing';
import { SubProcessesService } from './sub-processes.service';

describe('SubProcessesService', () => {
  let service: SubProcessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubProcessesService],
    }).compile();

    service = module.get<SubProcessesService>(SubProcessesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
