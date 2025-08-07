import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

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
        data: task //o data ou o message podem ser o que eu quiser
       }
    }
    
    async readAll() {
          console.log("Chamando readAll no service");
  const tasks = await this.prisma.task.findMany();
  console.log("Tasks retornadas:", tasks);
        return await this.prisma.task.findMany()

    }

    async readOne (id: string) {
        return await this.prisma.task.findUnique({
            where: {id}
        })
    }

    async updateOne (id: string, userId: string, updateTaskDto: UpdateTaskDto) {

        const task = await this.prisma.task.findFirst({ //procure o primeiro registro que tenha esse id e esse userId
            where: {
                id,
                userId
            }
        })

        if (!task) {
            throw new BadRequestException("Tarefa não encontrada ou não pertence a este usuário")
        }

        const updated = await this.prisma.task.updateMany({
            where: {id, userId},
            data: updateTaskDto
        })

        return {message: "Tarefa atualizada com sucesso."}
    }

     async deleteOne(id: string) {
                  if (!id) {
    throw new BadRequestException("ID da tarefa é obrigatório.");
  }

        const userExcluded = await this.prisma.task.findUnique({where: {id}})

        if (!userExcluded) {
            throw new BadRequestException("Este usuário não existe ou já foi excluído.")
        }

        return await this.prisma.task.delete({
            where: { id },
        });
    }   
}
