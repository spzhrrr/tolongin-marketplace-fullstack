import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Andi Pratama', minLength: 3, maxLength: 100 })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'andi@tolongin.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'StrongPass1!',
    minLength: 8,
    description: 'Min 8 chars, 1 number, 1 special char',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, {
    message: 'password must contain at least 1 number and 1 special character',
  })
  password!: string;

  @ApiProperty({ example: '+6281234567890', required: false })
  @IsOptional()
  @IsString()
  @Matches(/^(\+62|62|0)8[1-9][0-9]{7,11}$/, {
    message: 'phone must be a valid Indonesia phone number',
  })
  phone?: string;
}
