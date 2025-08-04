import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // conecta com o banco ao iniciar a aplicação
  }

  async onModuleDestroy() {
    await this.$disconnect(); // desconecta ao fechar o módulo
  }
}
