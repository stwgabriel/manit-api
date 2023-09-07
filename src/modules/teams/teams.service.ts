import { Injectable, NotFoundException } from '@nestjs/common';

import { IdDto } from 'src/shared/database/dto';
import { TeamsRepository } from 'src/shared/database/repositories/teams.repositories';

import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddUserToTeamDto } from './dto/add-user-to-team.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class TeamsService {
  constructor(
    private readonly teamsRepository: TeamsRepository,
    private readonly usersRepository: UsersRepository,
  ) { }

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
              include: {
                users: true,
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

    if (teams.length <= 0) {
      throw new NotFoundException('No teams found');
    }
    return teams;
  }

  async findOne({ id }: IdDto) {
    const team = await this.teamsRepository.findUnique({
      where: {
        id,
      },
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
        users: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
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

  async addUser({ id, email }: AddUserToTeamDto) {
    const existingTeam = await this.teamsRepository.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!existingTeam) {
      throw new NotFoundException('Team not found');
    }

    const user = await this.usersRepository.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedTeam = await this.teamsRepository.update({
      where: { id },
      data: {
        users: {
          create: {
            userId: user.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        processes: {
          select: {
            name: true,
            // subProcesses: true,
          },
        },
        users: {
          select: {
            user: {
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

    return updatedTeam;
  }

  async delete({ id }: IdDto) {
    await this.teamsRepository.delete({ where: { id } });

    return 'Team deleted';
  }
}
