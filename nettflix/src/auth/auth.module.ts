import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/auth/controllers/auth.controller';
import { User } from 'src/auth/models/user.model';
import { UsersService } from 'src/auth/services/users.service';
import 'dotenv/config';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '600s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    JWTGuard,
    {
      provide: APP_GUARD,
      useClass: JWTGuard,
    },
  ],
  exports: [JWTGuard],
})
export class AuthModule {}
