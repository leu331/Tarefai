import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module'; // importa o PrismaModule
import { JwtModule } from '@nestjs/jwt'; // importa o módulo de JWT
import { JwtStrategy } from './jwt.strategy'; // importa a estratégia JWT
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule, // permite usar PrismaService aqui
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
