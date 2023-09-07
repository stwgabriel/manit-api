import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';

import { SubProcessesService } from './sub-processes.service';

@Controller('sub-processes')
export class SubProcessesController {
  constructor(private readonly subProcessesService: SubProcessesService) {}

  @Post()
  create(@Request() { userId }, @Body() createSubProcessDto) {
    return this.subProcessesService.create({
      ...createSubProcessDto,
      userId,
    });
  }

  @Get()
  findAll(@Param('process/:id') id: string) {
    return this.subProcessesService.findAll({ id });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subProcessesService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Request() { userId },
    @Param('id') id: string,
    @Body() updateSubProcessDto,
  ) {
    return this.subProcessesService.update({
      id,
      userId,
      ...updateSubProcessDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subProcessesService.delete({ id });
  }
}
