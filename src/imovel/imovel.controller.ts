import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateImovelDto } from './dto/createImovel.dto';
import { ImovelService } from './imovel.service';
import { Imovel } from '@prisma/client';

@Controller('imovel')
export class ImovelController {
  constructor(private readonly ImovelService: ImovelService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createOne(@Body() CreateImovelDto: CreateImovelDto): Promise<Imovel> {
    return await this.ImovelService.createAd(CreateImovelDto);
  }
}
