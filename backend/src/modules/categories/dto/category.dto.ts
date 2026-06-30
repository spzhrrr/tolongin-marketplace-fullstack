import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { SERVICE_TYPE_VALUES } from '../../../common/constants/enums';
import type { ServiceType } from '../../../common/constants/enums';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Desain & Kreatif' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'desain-kreatif' })
  @IsString()
  slug!: string;

  @ApiProperty({ example: '🎨', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ enum: SERVICE_TYPE_VALUES, default: 'DIGITAL', required: false })
  @IsOptional()
  @IsEnum(SERVICE_TYPE_VALUES)
  serviceType?: ServiceType;
}

export class UpdateCategoryDto {
  @ApiProperty({ required: false }) @IsOptional() @IsString() name?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() slug?: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() icon?: string;
  @ApiProperty({ required: false, enum: SERVICE_TYPE_VALUES })
  @IsOptional()
  @IsEnum(SERVICE_TYPE_VALUES)
  serviceType?: ServiceType;
}
