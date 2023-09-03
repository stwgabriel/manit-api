import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProcessDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  teamId: string;
}
