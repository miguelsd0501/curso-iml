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
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @ApiProperty({
    description: `
    RFC receptor de la factura.  
    - Debe cumplir con el formato establecido por el SAT (Persona Física o Persona Moral).  
    - Ejemplos válidos:  
      - Persona Física: GODE561231GR8  
      - Persona Moral: ABC123456T12  
    - El valor es obligatorio y único en combinación con la fecha.  
    - Si ya existe un registro con el mismo RFC y fecha, no se permitirá el alta.`,
    example: 'SDGH950312UU9',
    pattern:
      '^([A-ZÑ&]{3,4})(\\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])[A-Z\\d]{2}[A\\d]$',
  })
  @IsString()
  @Matches(
    /^([A-ZÑ&]{3,4})(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{2}[A\d]$/,
    { message: 'RFC format is invalid' },
  )
  rfc: string;

  @ApiProperty({
    description: 'Fecha de timbrado con formato ISO 8601.',
    example: '2025-09-12T15:30:00Z',
  })
  @Type(() => Date) // convierte el string a Date
  @IsDate({ message: 'Date format is invalid' })
  @IsWithinLast72Hours({
    message: 'Date must be within the last 72 hours and not in the future',
  })
  date: Date;

  @ApiProperty({
    description: 'Nombre del comprador.',
    example: 'Miguel Santiago',
    minLength: 1,
    maxLength: 250,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  customer: string;

  @ApiProperty({
    description: 'Nombre del vendedor.',
    example: 'Jorge Perez',
    minLength: 1,
    maxLength: 250,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  seller: string;

  @ApiProperty({
    description: 'Cantidad del producto comprado. Solo acepta valores enteros.',
    example: 4,
    minimum: 1,
  })
  @IsPositive()
  @IsInt()
  @Min(1)
  quantity: number; // cantidad de unidades de un producto

  @ApiProperty({
    description: 'Precio del producto por unidad.',
    example: 4.5,
    minimum: 0.01,
  })
  @IsPositive()
  @IsNumber()
  @Min(0.01)
  unitPrice: number;

  @ApiProperty({
    description: 'Precio total por la compra de los productos.',
    example: 18,
    minimum: 0.01,
  })
  @IsPositive()
  @IsNumber()
  @Min(0.01)
  total: number;

  @ApiProperty({
    description: 'Descripción del motivo del CFDI.',
    example: 'Se ha realizado la compra de múltiples productos',
    required: false,
    minLength: 3,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  description?: string;
}
