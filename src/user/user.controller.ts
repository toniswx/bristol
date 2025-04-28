import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from './user.service';
import createUserDto from './dto/create-one.dto';
import deleteUserDTO from './dto/delete-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getOne(@Param() params: string): Promise<User> {
    const id = params['id'] as string;
    return await this.userService.getUserData(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createOne(@Body() createUserDto: createUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Delete()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async deleteUser(@Body() deleteUserDTO: deleteUserDTO): Promise<object> {
    return await this.userService.deleteUser(deleteUserDTO);
  }
}
