import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubProcessDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  processId: string;
}
