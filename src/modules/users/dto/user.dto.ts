import { Process, Team } from '@prisma/client';

export class UserDto {
  name: string;
  email: string;
  password: string;
  teams: Team[];
  processes: Process[];
}
