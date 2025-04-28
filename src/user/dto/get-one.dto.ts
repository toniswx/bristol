import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { ImovelDTO } from 'src/imovel/dto/createImovel.dto';

export class UserDataDTO {
  @ApiProperty({
    example: 'john_doe',
    description: 'Username of the user',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'user-1234-5678-9012',
    description: 'Unique identifier for the user',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: [ImovelDTO],
    description: 'Array of properties owned by the user',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImovelDTO)
  imoveis: ImovelDTO[];
}
