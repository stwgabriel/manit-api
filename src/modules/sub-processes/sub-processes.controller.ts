import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { SubProcessesService } from './sub-processes.service';
import { CreateSubProcessDto } from './dto/create-sub-process.dto';
import { UpdateSubProcessDto } from './dto/update-sub-process.dto';

@Controller('sub-processes')
export class SubProcessesController {
  constructor(private readonly subProcessesService: SubProcessesService) {}

  @Post()
  create(@Body() createSubProcessDto: CreateSubProcessDto) {
    return this.subProcessesService.create(createSubProcessDto);
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
    @Param('id') id: string,
    @Body() updateSubProcessDto: UpdateSubProcessDto,
  ) {
    return this.subProcessesService.update({
      id,
      ...updateSubProcessDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subProcessesService.delete({ id });
  }
}
