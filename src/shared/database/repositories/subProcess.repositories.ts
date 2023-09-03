import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class SubProcessRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.SubProcessCreateArgs) {
    return this.prismaService.subProcess.create(createDto);
  }

  update(updateDto: Prisma.SubProcessUpdateArgs) {
    return this.prismaService.subProcess.update(updateDto);
  }

  delete(deleteArgs: Prisma.SubProcessDeleteArgs) {
    return this.prismaService.subProcess.delete(deleteArgs);
  }

  findUnique(findUniqueArgs: Prisma.SubProcessFindUniqueArgs) {
    return this.prismaService.subProcess.findUnique(findUniqueArgs);
  }

  findMany(findManyArgs: Prisma.SubProcessFindManyArgs) {
    return this.prismaService.subProcess.findMany(findManyArgs);
  }
}
