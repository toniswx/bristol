import {
  Body,
  Controller,
  Delete,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from './user.service';
import createUserDto from './dto/create-one.dto';
import deleteUserDTO from './dto/delete-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
