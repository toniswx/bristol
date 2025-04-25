import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import loginDto from 'src/user/dto/login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(
    @Body() loginDto: loginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.AuthService.login(loginDto);

    response.cookie('set', data.sessionToken);
    response.cookie('ret', data.sessionToken);

    return;
  }
}
