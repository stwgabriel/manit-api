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

import { ProcessesService } from './processes.service';

@Controller('processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Post()
  create(@Request() { userId }, @Body() createProcessDto) {
    return this.processesService.create({ userId, ...createProcessDto });
  }

  @Get()
  findAll(@Param('team/:id') id: string) {
    return this.processesService.findAll({ id });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processesService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcessDto) {
    return this.processesService.update({
      id,
      ...updateProcessDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.processesService.delete({ id });
  }
}
