import { ApiProperty } from '@nestjs/swagger';
<<<<<<< HEAD
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
=======
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
import { DELIVERY_TYPE_VALUES } from '../../../common/constants/enums';
import type { DeliveryType } from '../../../common/constants/enums';

export class CreateOrderFromServiceDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false, enum: DELIVERY_TYPE_VALUES })
  @IsOptional()
  @IsEnum(DELIVERY_TYPE_VALUES)
  deliveryType?: DeliveryType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  deliveryAddress?: string;
}

export class CancelOrderDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  reason!: string;
}

export class RevisionRequestDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  reason!: string;
}
<<<<<<< HEAD
=======

export class SubmitWorkDto {
  @ApiProperty({ minLength: 10 })
  @IsString()
  @MinLength(10)
  note!: string;

  @ApiProperty({ type: [String], minItems: 1, maxItems: 10 })
  @IsArray()
  @ArrayMinSize(1, { message: 'Minimal satu bukti kerja wajib diupload' })
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @Matches(/^(https?:[/][/]|[/]api[/]uploads[/])/, {
    each: true,
    message: 'Lampiran harus berupa URL upload yang valid',
  })
  attachments!: string[];
}

// DTO untuk membuka sengketa pada sebuah order
export class OpenDisputeDto {
  @ApiProperty({ minLength: 3 })
  @IsString()
  @MinLength(3)
  reason!: string;

  @ApiProperty({ minLength: 10 })
  @IsString()
  @MinLength(10)
  description!: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  evidence?: string[];
}
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
