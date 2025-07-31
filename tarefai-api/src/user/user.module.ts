import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], //para o user module saber que pode usar o prismaModule, devo importá-lo aqui
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
