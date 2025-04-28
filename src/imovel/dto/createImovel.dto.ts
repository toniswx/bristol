import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ImovelDTO {
  @ApiProperty({
    example: 'Modern Apartment in Downtown',
    description: 'Title of the property',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'Date when the property was posted',
  })
  @IsDate()
  @Type(() => Date)
  postedAt: Date;

  @ApiProperty({
    example: '2023-01-02T00:00:00.000Z',
    description: 'Date when the property was last updated',
  })
  @IsDate()
  @Type(() => Date)
  lastUpdate: Date;

  @ApiProperty({
    example: 'Spacious 3-bedroom apartment with great view',
    description: 'Detailed description of the property',
  })
  @IsString()
  @IsNotEmpty()
  textDescription: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'State where the property is located',
  })
  @IsString()
  @IsNotEmpty()
  estate: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'City where the property is located',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: '01311-100',
    description: 'Postal code of the property',
  })
  @IsString()
  @IsNotEmpty()
  CEP: string;

  @ApiProperty({
    example: 1500000.5,
    description: 'Price of the property',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'R$ 2.500,00',
    description: 'IPTU value of the property',
  })
  @IsString()
  @IsNotEmpty()
  IPTU: string;

  @ApiProperty({
    example: 4,
    description: 'Total number of rooms',
  })
  @IsNumber()
  @IsNotEmpty()
  rooms: number;

  @ApiProperty({
    example: 2,
    description: 'Number of bathrooms',
  })
  @IsNumber()
  @IsNotEmpty()
  bathrooms: number;

  @ApiProperty({
    example: 1,
    description: 'Number of garage spaces',
  })
  @IsNumber()
  @IsNotEmpty()
  garage: number;

  @ApiProperty({
    example: true,
    description: 'Whether the property has parking',
  })
  @IsBoolean()
  @IsNotEmpty()
  hasParking: boolean;

  @ApiProperty({
    example: 3.5,
    description: 'Number of bedrooms (can be half rooms)',
  })
  @IsNumber()
  @IsNotEmpty()
  bedrooms: number;

  @ApiProperty({
    example: 125.75,
    description: 'Total area in square meters',
  })
  @IsNumber()
  @IsNotEmpty()
  area: number;
}
