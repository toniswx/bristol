import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsInt,
  Length,
} from 'class-validator';

export class CreateImovelDto {
  @ApiProperty({
    example: 'Modern Apartment in Downtown',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  title: string;

  @ApiProperty({
    example: 'Spacious 3-bedroom apartment with great view...',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 2000)
  textDescription: string;

  @ApiProperty({
    example: 'São Paulo',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  estate: string;

  @ApiProperty({
    example: 'São Paulo',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: '01311-000',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 9)
  CEP: string;

  @ApiProperty({
    example: 500000.0,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 'R$ 2.500,00',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  IPTU: string;

  @ApiProperty({
    example: 3,
    required: true,
  })
  @IsInt()
  @IsPositive()
  rooms: number;

  @ApiProperty({
    example: 2,
    required: true,
  })
  @IsInt()
  @IsPositive()
  bathrooms: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsInt()
  @IsPositive()
  garage: number;

  @ApiProperty({
    example: 85.5,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  sizeInSquareMeters: number;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    required: true,
    description: 'ID of the user who owns this property',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
