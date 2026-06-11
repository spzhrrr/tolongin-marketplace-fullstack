import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
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

export class SubmitWorkDto {
  @ApiProperty({ minLength: 10 })
  @IsString()
  @MinLength(10)
  note!: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  attachments?: string[];
}
