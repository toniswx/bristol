import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class deleteUserDTO {
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
  @IsNotEmpty()
  password: string;
}
