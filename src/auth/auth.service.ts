import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hashSync, compareSync } from 'bcryptjs';
import loginDto from '../user/dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { SessionService } from 'src/session/session.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly session: SessionService,
    private readonly jwtService: JwtService,
  ) {}

  hashPassword(passwordToEncrypt: string): string {
    const encryptedPassword = hashSync(passwordToEncrypt, 2);

    console.log(encryptedPassword);
    return encryptedPassword;
  }
  comparePassword(hash: string, password: string): boolean {
    const isValidPassword = compareSync(password, hash);
    return isValidPassword;
  }

  async login(loginDto: loginDto): Promise<{
    sessionToken: string;
    refreshToken: string;
  }> {
    const userData = await this.prisma.user.findFirst({
      where: {
        email: loginDto.email,
      },
    });

    if (!userData) {
      throw new NotFoundException();
    }

    const isValidPassword = this.comparePassword(
      userData.password,
      loginDto.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const sessionData = this.session.createSession(userData.id);

    return sessionData;
  }
}
