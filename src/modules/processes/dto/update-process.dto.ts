import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { CreateProcessDto } from './create-process.dto';

export class UpdateProcessDto extends PartialType(CreateProcessDto) {
  id: string;
}
