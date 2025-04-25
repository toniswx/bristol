import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import loginDto from 'src/user/dto/login.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtPayload, SessionService } from '../session/session.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService,
    private readonly SessionService: SessionService,
  ) {}
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
  @Post('session')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  session(@Req() request: Request): JwtPayload {
    const authToken = request.cookies['set'] as string;
    const verifyToken = this.SessionService.verifyToken(authToken);

    return verifyToken;
  }
}
