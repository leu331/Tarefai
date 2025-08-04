import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-sto';

@Controller('users') 
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
   async readAll() {
    return await this.userService.readAll();
  }

  @Get(":id")
  async readOne(@Param("id") id: string) {
    return await this.userService.readOne(id)
  }

  @Put(":id")
  async updateOne(@Param("id") id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return await this.userService.updateOne(id, UpdateUserDto)
  }

  @Delete(":id")
  async deleteOne(@Param(":id") id: string) {
    return await this.userService.deleteOne(id) 
  }
}
