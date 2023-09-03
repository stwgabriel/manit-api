import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class TeamsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.TeamCreateArgs) {
    return this.prismaService.team.create(createDto);
  }

  update(updateDto: Prisma.TeamUpdateArgs) {
    return this.prismaService.team.update(updateDto);
  }

  delete(deleteArgs: Prisma.TeamDeleteArgs) {
    return this.prismaService.team.delete(deleteArgs);
  }

  findUnique(findUniqueArgs: Prisma.TeamFindUniqueArgs) {
    return this.prismaService.team.findUnique(findUniqueArgs);
  }

  findMany(findManyArgs: Prisma.TeamFindManyArgs) {
    return this.prismaService.team.findMany(findManyArgs);
  }
}
