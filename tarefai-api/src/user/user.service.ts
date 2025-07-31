import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-use-dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){} //construtor cria a classe prisma e diz que ela é do tipo do prismaService que criamos, agora nossa classe está disponível para criar o CRUD

    create (createUserDto: CreateUserDto) {
        
    }

    readAll() {
        return this.prisma.user.findMany()
    }
}
