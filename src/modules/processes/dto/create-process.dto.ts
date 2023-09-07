import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProcessDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  stageId: string;

  @IsString()
  @IsNotEmpty()
  teamId: string;
}
