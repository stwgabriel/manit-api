import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { CreateSubProcessDto } from './create-sub-process.dto';

export class UpdateSubProcessDto extends PartialType(CreateSubProcessDto) {
  id: string;
}
