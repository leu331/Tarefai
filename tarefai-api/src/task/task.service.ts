import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create.task.dto';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService){}

    async create(data: CreateTaskDto, userId: string) {

       const existingTask = await this.prisma.task.findFirst({
        where: {title: data.title}
       }) 

       if (existingTask) {
        throw new BadRequestException("Já existe uma tarefa com este título.")
       }

       const task = await this.prisma.task.create({
        data: {
            ...data, userId: userId
        }
       })

       return {
        message: "Sua tarefa foi registrada.",
        data
       }
    }
    
}
