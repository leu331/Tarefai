import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], //registra o prisma service que criamos
  exports: [PrismaService], //permite que a gente possa usar ele fora desse arquivo
})
export class PrismaModule {}
