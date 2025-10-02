import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto {
  @ApiProperty({
    description: 'Lista de los errores encontrados.',
    type: String,
    isArray: true,
    example: ['RFC format is invalid', 'quantity must be an integer number'],
  })
  message: string[];
  @ApiProperty({
    description: 'Descripción general del error.',
    example: 'Bad Request',
  })
  error: string;
  @ApiProperty({
    description: 'Código HTTP de respuesta.',
    example: 400,
  })
  statusCode: number;
}
