import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from './user.service';
import createUserDto from './dto/create-one.dto';
import deleteUserDTO from './dto/delete-user.dto';
import { UserDataDTO } from './dto/get-one.dto';
import { SessionService } from 'src/session/session.service';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getOne(@Param() params: string): Promise<UserDataDTO> {
    const id = params['id'] as string;
    return await this.userService.getUserData(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createOne(
    @Body() createUserDto: createUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<User> {
    const newUserData = await this.userService.createUser(createUserDto);
    const newSession = this.sessionService.createSession(newUserData.id);
    response.cookie('set', newSession.sessionToken);
    response.cookie('ret', newSession.sessionToken);
    return newUserData;
  }

  @Delete()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async deleteUser(@Body() deleteUserDTO: deleteUserDTO): Promise<object> {
    return await this.userService.deleteUser(deleteUserDTO);
  }
}
