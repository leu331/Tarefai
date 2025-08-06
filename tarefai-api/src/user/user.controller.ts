import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-sto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { User } from './user.decorator';

@UseGuards(JwtAuthGuard) // protege TODAS as rotas do controller
@Controller('users') 
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async readAll(@User('role') role: string) {
    if(role !== 'ADMIN'){
      throw new ForbiddenException('Acesso negado.');
    }
    return await this.userService.readAll();
  }

  @Get(":id")
  async readOne(
    @Param("id") id: string, 
    @User('id') userId: string, 
    @User('role') role: string
  ) {
    if(role !== 'ADMIN' && id !== userId){
      console.log('id param:', id);
console.log('userId from token:', userId);
console.log('role from token:', role);
      throw new ForbiddenException('Você só pode acessar seu próprio perfil.');
      
    }
    return await this.userService.readOne(id)
  }

  @Put(":id")
  async updateOne(
    @Param("id") id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @User('userId') userId: string, 
    @User('role') role: string
  ) {
    if(role !== 'ADMIN' && id !== userId){
      throw new ForbiddenException('Você só pode atualizar seu próprio perfil.');
    }
    return await this.userService.updateOne(id, updateUserDto)
  }

  @Delete(":id")
  async deleteOne(
    @Param("id") id: string, 
    @User('userId') userId: string, 
    @User('role') role: string
  ) {
    if(role !== 'ADMIN' && id !== userId){
      throw new ForbiddenException('Você só pode deletar seu próprio perfil.');
    }
    return await this.userService.deleteOne(id) 
  }
}
