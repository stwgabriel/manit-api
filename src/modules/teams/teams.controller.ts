import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get('user/:id')
  findAll(@Param('id') id) {
    return this.teamsService.findAll({ id });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update({
      id,
      ...updateTeamDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teamsService.delete({ id });
  }
}
