import { Injectable, NotFoundException } from '@nestjs/common';

import { IdDto } from 'src/shared/database/dto';
import { TeamsRepository } from 'src/shared/database/repositories/teams.repositories';

import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsRepository: TeamsRepository) {}

  async create({ user, name, processes }: CreateTeamDto) {
    const team = await this.teamsRepository.create({
      data: {
        name,
        users: {
          create: {
            userId: user,
          },
        },
        processes: {
          createMany: {
            data: processes,
          },
        },
      },
    });

    return team;
  }

  async findAll({ id }: IdDto) {
    const teams = await this.teamsRepository.findMany({
      select: {
        id: true,
        name: true,
        processes: {
          select: {
            name: true,
            subProcess: true,
          },
        },
        users: {
          select: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      where: {
        users: {
          some: {
            userId: id,
          },
        },
      },
    });
    return teams;
  }

  async findOne({ id }: IdDto) {
    const team = await this.teamsRepository.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        processes: {
          select: {
            id: true,
            name: true,
            subProcess: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        users: {
          select: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return team;
  }

  async update({ id, name }: UpdateTeamDto) {
    const existingTeam = await this.teamsRepository.findUnique({
      where: { id },
    });

    if (!existingTeam) {
      throw new NotFoundException('Equipe não encontrada');
    }

    const updatedTeam = await this.teamsRepository.update({
      where: { id },
      data: {
        name,
      },
    });

    return updatedTeam;
  }

  async delete({ id }: IdDto) {
    await this.teamsRepository.delete({ where: { id } });

    return 'Team deleted';
  }
}
