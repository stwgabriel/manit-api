import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { ProcessRepository } from 'src/shared/database/repositories/process.repositories';
import { IdDto } from 'src/shared/database/dto';

@Injectable()
export class ProcessesService {
  constructor(private readonly processRepository: ProcessRepository) {}

  async create({ name, teamId, userId }: CreateProcessDto) {
    const peocess = await this.processRepository.create({
      data: {
        name,
        teamId,
        userId,
      },
    });

    return peocess;
  }

  async findAll({ id }: IdDto) {
    const processes = await this.processRepository.findMany({
      select: {},
      where: {
        teamId: id,
      },
    });
    return processes;
  }

  async findOne({ id }: IdDto) {
    const peocess = await this.processRepository.findUnique({
      where: {
        id,
      },
      select: {},
    });

    return peocess;
  }

  async update({ id, name }: UpdateProcessDto) {
    const existingProcess = await this.processRepository.findUnique({
      where: { id },
    });

    if (!existingProcess) {
      throw new NotFoundException('process not found');
    }

    const updatedTeam = await this.processRepository.update({
      where: { id },
      data: {
        name,
      },
    });

    return updatedTeam;
  }

  async delete({ id }: IdDto) {
    await this.processRepository.delete({ where: { id } });

    return 'process deleted';
  }
}
