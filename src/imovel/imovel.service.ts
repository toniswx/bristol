import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateImovelDto } from './dto/createImovel.dto';
import { Imovel } from '@prisma/client';
import { randomUUID } from 'crypto';

@Injectable()
export class ImovelService {
  constructor(private readonly prisma: PrismaService) {}

  async createAd(CreateImovelDto: CreateImovelDto): Promise<Imovel> {
    return await this.prisma.imovel.create({
      data: { ...CreateImovelDto, id: randomUUID() },
    });
  }
}
