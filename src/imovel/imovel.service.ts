import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ImovelDTO } from './dto/createImovel.dto';
import { Imovel, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

@Injectable()
export class ImovelService {
  constructor(private readonly prisma: PrismaService) {}

  async createAd(CreateImovelDto: ImovelDTO, userId: string): Promise<Imovel> {
    try {
      const newAd = await this.prisma.imovel.create({
        data: { ...CreateImovelDto, id: randomUUID(), userId: userId },
      });

      return newAd;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(err);
        switch (err.code) {
          case 'P2003':
            throw new NotFoundException(err);

          default:
            throw new InternalServerErrorException('Database operation failed');
        }
      } else {
        throw err;
      }
    }
  }
}
