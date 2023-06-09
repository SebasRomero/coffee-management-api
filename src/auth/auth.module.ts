import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth-v1.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.SECRET_JWT,
          signOptions: {
            expiresIn: process.env.EXPIRES_IN_JWT,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
