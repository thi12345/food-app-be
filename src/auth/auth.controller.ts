import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from '@/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private mailerService: MailerService
  ) {}
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


  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }

  @Get('mail')
  @Public()
  testMail() {
    this.mailerService.sendMail({
      to: 'nhockaka2002@gmail.com',
      subject: 'Hello World',
      text: 'Plain text content',
      html: '<b>HTML content</b>',
      template: 'register',
      context: {
        name:   'John Doe',
        activationCode: 123456
      }
    });
    return 'success';
  }
}