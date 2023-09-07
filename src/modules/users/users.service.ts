import { Injectable } from '@nestjs/common';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { IdDto } from 'src/shared/database/dto';

import { createStageDto } from './dto/create-stage.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  createStage({ id, name, color }: createStageDto) {
    return this.usersRepository.update({
      data: {
        stages: {
          create: {
            name,
            color,
          },
        },
      },
      where: {
        id,
      },
    });
  }

  async findOne({ id }: IdDto) {
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
        id,
      },
    });
    return {
      ...user,
      password: null,
    };
  }
}
