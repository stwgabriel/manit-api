import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';
import { SigninDto } from './signin.dto';

export class SignupDto extends PartialType(SigninDto) {
  @IsString()
  @IsNotEmpty()
  name: string;
}
