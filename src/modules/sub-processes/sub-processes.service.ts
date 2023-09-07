import { Injectable, NotFoundException } from '@nestjs/common';

import { IdDto } from 'src/shared/database/dto';
import { SubProcessesRepository } from 'src/shared/database/repositories/subProcesses.repositories';

import { CreateSubProcessDto } from './dto/create-sub-process.dto';
import { UpdateSubProcessDto } from './dto/update-sub-process.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class SubProcessesService {
  constructor(
    private readonly subProcessesRepository: SubProcessesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create({ name, processId, stageId, userId }: CreateSubProcessDto) {
    await this.subProcessesRepository.create({
      data: {
        name,
        processId,
        stageId,
      },
    });

    const user = await this.usersRepository.findUnique({
      include: {
        processes: {
          include: {
            stage: true,
            subProcesses: {
              include: {
                stage: true,
              },
            },
            team: true,
          },
        },
        stages: {
          include: {
            processes: {
              include: {
                stage: true,
                subProcesses: {
                  include: {
                    stage: true,
                  },
                },
                team: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            subProcesses: {
              include: {},
            },
          },
        },
      },
      where: {
        id: userId,
      },
    });
    return {
      ...user,
      password: null,
    };
  }

  async findAll({ id }: IdDto) {
    const processes = await this.subProcessesRepository.findMany({
      select: {},
      where: {
        processId: id,
      },
    });
    return processes;
  }

  async findOne({ id }: IdDto) {
    const subProcess = await this.subProcessesRepository.findUnique({
      select: {},
      where: {
        id,
      },
    });

    return subProcess;
  }

  async update({ id, name, stageId, userId }: UpdateSubProcessDto) {
    const existingSubProcess = await this.subProcessesRepository.findUnique({
      select: { id: true },
      where: { id },
    });

    if (!existingSubProcess) {
      throw new NotFoundException('process not found');
    }

    await this.subProcessesRepository.update({
      where: { id },
      data: {
        name,
        stageId,
      },
    });

    const user = await this.usersRepository.findUnique({
      include: {
        processes: {
          include: {
            stage: true,
            subProcesses: {
              include: {
                stage: true,
              },
            },
            team: true,
          },
        },
        stages: {
          include: {
            processes: {
              include: {
                stage: true,
                subProcesses: {
                  include: {
                    stage: true,
                  },
                },
                team: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            subProcesses: {
              include: {},
            },
          },
        },
      },
      where: {
        id: userId,
      },
    });
    return {
      ...user,
      password: null,
    };
  }

  async delete({ id }: IdDto) {
    await this.subProcessesRepository.delete({ where: { id } });

    return 'sub-process deleted';
  }
}
