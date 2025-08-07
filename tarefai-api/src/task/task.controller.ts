import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { ASYNC_METHOD_SUFFIX } from '@nestjs/common/module-utils/constants';
import { CreateTaskDto } from './dto/create.task.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { User } from 'src/user/user.decorator';
import { UpdateTaskDto } from './dto/update.task.dto';
 @UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
   
    @Post()
    async create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) { //req serve para eu recuperar as informações disponíveis no momento da requisição, aqui como eu dependo do userId, preciso dela
        const userId = req.user.id;
        return await this.taskService.create(createTaskDto, userId);
    }

    @Get()
    async readAll(@User('role') role: string) {
       if(role !== 'admin'){
         throw new ForbiddenException('Acesso negado.');
       }
       return await this.taskService.readAll();  
    }

    @Get(":id")
    async readOne (
        @Param("id") id:string,
        @User("id") userId: string,
        @User("role") role: string
    ) {
        if (role !== 'ADMIN') {
        // Se o usuário não for admin, só pode buscar a própria tarefa
        const task = await this.taskService.readOne(id);

        if (!task || task.userId !== userId) {
            throw new ForbiddenException("Essa tarefa não existe ou você não tem permissão para vizualizá-la.");
        }

        return task;
    }
        return await this.taskService.readOne(id);
    }

    @Put("id")
    async updateOne(
        @Param("id") id: string, 
        @Body() updateTaskDto: UpdateTaskDto,
        @User('id') userId: string, 
        @User('role') role: string
    ) {
        if (role !== "admin") {
        // Se não for admin, garante que a tarefa pertence ao usuário
        const task = await this.taskService.readOne(id);

        if (!task || task.userId !== userId) {
            throw new ForbiddenException("Você não tem permissão para editar essa tarefa.");
        }
    }

    return await this.taskService.updateOne(id, userId, updateTaskDto);
    }

    @Delete(":id")
    async deleteOne(
        @Param("id") id: string, 
        @User('id') userId: string, 
        @User('role') role: string
    ) {
        if (role !== "admin") {
            const task = await this.taskService.readOne(id)

            if (!task || task.userId !== userId) {
                throw new ForbiddenException("Você não tem permissão para excluir essa tarefa.");
            }
        }
         return await this.taskService.deleteOne(id);
    }
}


//melhorar o controller