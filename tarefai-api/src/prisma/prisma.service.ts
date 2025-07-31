import { Injectable, OnModuleInit } from "@nestjs/common";
import {PrismaClient} from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect() //conecta com o banco ao inicar a aplicação
    }

    async enableShutdownHooks() {
        await this.$disconnect() //disconecta ao fechar
    }
}