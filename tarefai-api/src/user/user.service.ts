import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user-sto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){} //construtor cria a classe prisma e diz que ela é do tipo do prismaService que criamos, agora nossa classe está disponível para criar o CRUD

    async create(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
    });

    if (existingUser) {
        throw new BadRequestException('Email já cadastrado');
    }

    if (data.password.includes(data.name) || data.password.includes(data.email)) {
        throw new BadRequestException('A senha não pode conter nome ou email.');
    }

    const user = await this.prisma.user.create({ data });
    return user;
     
    }

    async readAll() {
        return await this.prisma.user.findMany()
    }

    async readOne(id: string) {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async updateOne(id: string, updateUserDto: UpdateUserDto) {

        const userExists = await this.prisma.user.findUnique({ where: { id } });
        
        if (!userExists) {
            throw new BadRequestException('Usuário não encontrado.');
        }

        return await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }   

     async deleteOne(id: string) {
        return await this.prisma.user.delete({
            where: { id },
        });
    }   
}
