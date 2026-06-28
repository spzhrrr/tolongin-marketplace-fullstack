import { ApiProperty } from '@nestjs/swagger';
<<<<<<< HEAD
=======
import { Transform } from 'class-transformer';
>>>>>>> ec26484 (implementasi demo)
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
<<<<<<< HEAD
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
=======
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: 'Nama harus berupa teks' })
  @MinLength(3, { message: 'Nama minimal 3 karakter' })
  @MaxLength(100, { message: 'Nama maksimal 100 karakter' })
  name!: string;

  @ApiProperty({ example: 'andi@tolongin.com' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'Format email tidak valid' })
  email!: string;
  @ApiProperty({
    example: 'Aq1ll@2005',
    minLength: 8,
    description:
      'Minimal 8 karakter, harus mengandung huruf besar, huruf kecil, angka, dan simbol',
  })
  @IsString({ message: 'Kata sandi harus berupa teks' })
  @MinLength(8, { message: 'Kata sandi minimal 8 karakter' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
    {
      message:
        'Kata sandi harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, angka, dan simbol',
    },
  )
  password!: string;

  @ApiProperty({ example: '081234567890', required: false })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    // Hilangkan spasi, titik, dan tanda hubung agar fleksibel saat input
    const normalized = value.replace(/[\s.-]/g, '');
    return normalized || undefined;
  })
  @IsOptional()
  @IsString({ message: 'Nomor telepon harus berupa teks' })
  // Format Indonesia: +62, 62, atau 0 diikuti 8xx (operator seluler)
  @Matches(/^(\+62|62|0)8[1-9][0-9]{6,11}$/, {
    message:
      'Nomor telepon tidak valid. Gunakan format Indonesia, contoh: 081234567890, +6281234567890, atau 6281234567890',
>>>>>>> ec26484 (implementasi demo)
  })
  phone?: string;
}
