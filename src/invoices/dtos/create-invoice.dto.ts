import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IsWithinLast72Hours } from '../validations/is-within-last-72-hours.decorator';

export class CreateInvoiceDto {
  @IsString()
  @Matches(
    /^([A-ZÑ&]{3,4})(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{2}[A\d]$/,
    { message: 'RFC format is invalid' },
  )
  rfc: string;

  @Type(() => Date) // convierte el string a Date
  @IsDate({ message: 'Date format is invalid' })
  @IsWithinLast72Hours({
    message: 'Date must be within the last 72 hours and not in the future',
  })
  date: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  customer: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  seller: string;

  @IsPositive()
  @IsInt()
  @Min(1)
  quantity: number; // cantidad de unidades de un producto

  @IsPositive()
  @IsNumber()
  @Min(0.01)
  unitPrice: number;

  @IsPositive()
  @IsNumber()
  @Min(0.01)
  total: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  description?: string;
}
