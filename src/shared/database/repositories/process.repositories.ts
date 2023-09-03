import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class ProcessRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ProcessCreateArgs) {
    return this.prismaService.process.create(createDto);
  }

  update(updateDto: Prisma.ProcessUpdateArgs) {
    return this.prismaService.process.update(updateDto);
  }

  delete(deleteArgs: Prisma.ProcessDeleteArgs) {
    return this.prismaService.process.delete(deleteArgs);
  }

  findUnique(findUniqueArgs: Prisma.ProcessFindUniqueArgs) {
    return this.prismaService.process.findUnique(findUniqueArgs);
  }

  findMany(findManyArgs: Prisma.ProcessFindManyArgs) {
    return this.prismaService.process.findMany(findManyArgs);
  }
}
