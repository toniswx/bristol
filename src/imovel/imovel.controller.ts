import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ImovelService } from './imovel.service';
import { Imovel } from '@prisma/client';
import { ImovelDTO } from './dto/createImovel.dto';
import { AuthGuard, CustomRequest } from 'src/auth/auth.guard';

@Controller('imovel')
export class ImovelController {
  constructor(private readonly ImovelService: ImovelService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createOne(
    @Req() req: CustomRequest,
    @Body() CreateImovelDto: ImovelDTO,
  ): Promise<Imovel> {
    const userId = req.userId;
    return await this.ImovelService.createAd(CreateImovelDto, userId);
  }
}
