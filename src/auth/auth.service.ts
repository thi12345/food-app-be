
import { comparePasswordHelper } from '@/helpers/util';
import { User } from '@/modules/users/schemas/user.schema';
import { UsersService } from '@/modules/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,

  ) {}

  async signIn(
    emailOrPhone: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByEmailOrPhoneNumber(emailOrPhone);
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload 
      // is the key that was passed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async validateUser(emailOrPhone: string, pass: string): Promise<any> {
    const user =await this.usersService.findOneByEmailOrPhoneNumber(emailOrPhone);
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    if(!user) return null;
    return user;
  }
  async login(user: User){
    const payload = { sub: user.id, username: user.email };
    return {
    access_token: await this.jwtService.sign(payload)
    };
  }

  handleRegister = async (createAuthDto: any) =>{
    return await this.usersService.handleRegister(createAuthDto);
  }
}
