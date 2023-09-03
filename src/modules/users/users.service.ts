import { Injectable } from '@nestjs/common';
import { IdDto } from 'src/shared/database/dto';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findOne({ id }: IdDto) {
    return this.usersRepository.findUnique({
      where: {
        id,
      },
    });
  }
}
