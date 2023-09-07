import { Injectable, NotFoundException } from '@nestjs/common';

import { IdDto } from 'src/shared/database/dto';
import { SubProcessRepository } from 'src/shared/database/repositories/subProcess.repositories';

import { CreateSubProcessDto } from './dto/create-sub-process.dto';
import { UpdateSubProcessDto } from './dto/update-sub-process.dto';

@Injectable()
export class SubProcessesService {
  constructor(private readonly subProcessRepository: SubProcessRepository) { }

  async create({ name, processId, stageId }: CreateSubProcessDto) {
    const subProcess = await this.subProcessRepository.create({
      data: {
        name,
        processId,
        stageId,
      },
    });

    return subProcess;
  }

  async findAll({ id }: IdDto) {
    const processes = await this.subProcessRepository.findMany({
      select: {},
      where: {
        processId: id,
      },
    });
    return processes;
  }

  async findOne({ id }: IdDto) {
    const subProcess = await this.subProcessRepository.findUnique({
      select: {},
      where: {
        id,
      },
    });

    return subProcess;
  }

  async update({ id, name, stageId }: UpdateSubProcessDto) {
    const existingSubProcess = await this.subProcessRepository.findUnique({
      select: { id: true },
      where: { id },
    });

    if (!existingSubProcess) {
      throw new NotFoundException('process not found');
    }

    const updatedTeam = await this.subProcessRepository.update({
      where: { id },
      data: {
        name,
        stageId,
      },
    });

    return updatedTeam;
  }

  async delete({ id }: IdDto) {
    await this.subProcessRepository.delete({ where: { id } });

    return 'sub-process deleted';
  }
}
