import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { SignInDto } from 'src/auth/dtos/sign-in.dto';
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import { UsersService } from 'src/auth/services/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.usersService.signUp(dto);
  }

  @IsPublic()
  @Post('signIn')
  signIn(@Body() dto: SignInDto) {
    return this.usersService.signIn(dto);
  }
}
