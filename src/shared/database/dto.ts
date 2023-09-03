import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class IdDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
