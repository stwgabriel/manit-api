import 'dotenv/config';
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

import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { AddUserToTeamDto } from './dto/add-user-to-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  findAll(@Request() { userId }: any) {
    return this.teamsService.findAll({ id: userId });
  }

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Post(':id')
  addUser(@Param('id') id: string, @Body() userToBeAdded: { email: string }) {
    console.log(id, userToBeAdded);
    return this.teamsService.addUser({
      id,
      ...userToBeAdded,
    } as AddUserToTeamDto);
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
