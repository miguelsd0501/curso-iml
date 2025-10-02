import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // realiza la conversiòn de string a numero
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number;
}
