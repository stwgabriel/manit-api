import { Controller, Post, Body, SetMetadata } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @SetMetadata('IS_ROUTE_PUBLIC', true)
  authenticate(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('signup')
  @SetMetadata('IS_ROUTE_PUBLIC', true)
  create(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
