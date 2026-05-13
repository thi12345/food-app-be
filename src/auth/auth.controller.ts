import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from '@/decorator/customize';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }
    @UseGuards(LocalAuthGuard)
      @Post('logout')
       logout(@Request() req) {
  return req.logout();
}

  //@UseGuards(JwtAuthGuard)
  @Post('register')
  @Public()
  getProfile(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }
}