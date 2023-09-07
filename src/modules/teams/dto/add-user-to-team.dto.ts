import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddUserToTeamDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  email: string;
}
