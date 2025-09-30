import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'Número de elementos por página',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // realiza la conversiòn de string a numero
  limit?: number;

  @ApiProperty({
    default: 1,
    description: 'Número de página a mostrar',
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number;
}
