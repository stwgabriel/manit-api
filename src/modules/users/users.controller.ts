import { Controller, Get, Post, Param, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { createStageDto } from './dto/create-stage.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Post(':id/stage')
  createStage(@Param('id') id: string, @Body() body: createStageDto) {
    return this.usersService.createStage({ id, ...body });
  }
}
