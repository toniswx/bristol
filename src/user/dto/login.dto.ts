import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export default class loginDto {
  @ApiProperty({
    example: 'email@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    required: true,
  })
  @IsString()
  @Length(7, 20)
  password: string;
}
