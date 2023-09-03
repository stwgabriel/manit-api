import { Process } from '@prisma/client';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  processes: Process[];
}
