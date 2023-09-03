import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin({ email, password }: SigninDto) {
    const user = await this.usersRepository.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        teams: {
          select: {
            teams: {
              select: {
                id: true,
                name: true,
                processes: {
                  select: {
                    id: true,
                    name: true,
                    subProcess: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        processes: {
          select: {
            id: true,
            name: true,
            subProcess: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return {
      ...user,
      password: null,
      accessToken,
    };
  }

  async signup({ name, email, password }: SignupDto) {
    const emailTaken = await this.usersRepository.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) throw new ConflictException('Email already taken');

    const hashedPassword = await hash(password, 11);

    const user = await this.usersRepository.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        teams: {
          select: {
            teams: {
              select: {
                id: true,
                name: true,
                processes: {
                  select: {
                    id: true,
                    name: true,
                    subProcess: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        processes: {
          select: {
            id: true,
            name: true,
            subProcess: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const accessToken = await this.generateAccessToken(user.id);

    return {
      ...user,
      accessToken,
    };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
