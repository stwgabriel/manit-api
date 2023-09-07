import { Injectable, NotFoundException } from '@nestjs/common';

import { IdDto } from 'src/shared/database/dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { ProcessesRepository } from 'src/shared/database/repositories/processes.repositories';

import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';

@Injectable()
export class ProcessesService {
  constructor(
    private readonly processesRepository: ProcessesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create({ name, stageId, teamId, userId }: CreateProcessDto) {
    await this.processesRepository.create({
      data: {
        name,
        stageId,
        teamId,
        userId,
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
    const processes = await this.processesRepository.findMany({
      select: {},
      where: {
        teamId: id,
      },
    });
    return processes;
  }

  async findOne({ id }: IdDto) {
    const process = await this.processesRepository.findUnique({
      where: {
        id,
      },
      select: {},
    });

    return process;
  }

  async update({ id, name, stageId, userId }: UpdateProcessDto) {
    const existingProcess = await this.processesRepository.findUnique({
      where: { id },
    });

    if (!existingProcess) {
      throw new NotFoundException('process not found');
    }

    await this.processesRepository.update({
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
    return await this.processesRepository.delete({ where: { id } });
  }
}
