import { AuthService } from './../auth/auth.service';
import { Prisma, PrismaClient, User } from '@prisma/client';
import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import createUserDto from './dto/create-one.dto';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import deleteUserDTO from './dto/delete-user.dto';
import { UserDataDTO } from './dto/get-one.dto';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private prisma: PrismaService,
    private readonly sessionService: SessionService,
  ) {}

  async getUserData(userId: string): Promise<UserDataDTO> {
    const data = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        username: true,
        imoveis: true,
        id: true,
      },
    });

    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  async createUser(createUserDto: createUserDto): Promise<User> {
    const hashedPassword = this.authService.hashPassword(
      createUserDto.password,
    );
    try {
      return await this.prisma.$transaction(async (tx: PrismaClient) => {
        const newUser = await tx.user.create({
          data: {
            ...createUserDto,
            password: hashedPassword,
            id: randomUUID(),
          },
        });
        return newUser;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new ConflictException(
              'Invalid email,try again with a valid one.',
            );
          case 'P2025':
            throw new NotFoundException('Required records not found');
          default:
            throw new InternalServerErrorException('Database operation failed');
        }
      } else {
        throw error;
      }
    }
  }
  async deleteUser(deleteUserDTO: deleteUserDTO): Promise<object> {
    try {
      const userData = await this.prisma.user.findFirst({
        where: {
          email: deleteUserDTO.email,
        },
      });

      if (!userData) {
        throw new NotFoundException();
      }
      const comparePasswords = this.authService.comparePassword(
        userData.password,
        deleteUserDTO.password,
      );
      if (!comparePasswords) {
        throw new UnauthorizedException();
      }
      await this.prisma.user.delete({
        where: {
          email: deleteUserDTO.email,
        },
      });

      return {
        message: 'User deleted successfully.',
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundException('Required records not found');
          default:
            throw new InternalServerErrorException('Database operation failed');
        }
      } else {
        throw error;
      }
    }
  }
}
