import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './passport/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule,
     JwtModule.registerAsync({
  useFactory: async (configService: ConfigService) => ({
    secretOrPrivateKey: configService.get<string>('JWT_SECRET_KEY'),
    signOptions: {
        expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED'),
    },
  }),
  inject: [ConfigService],
}),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
