import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubProcessDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  processId: string;

  @IsString()
  @IsNotEmpty()
  stageId: string;
}
