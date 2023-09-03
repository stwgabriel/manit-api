import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { SignupDto } from '../../auth/dto/signup.dto';

export class UpdateUserDto extends PartialType(SignupDto) {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
