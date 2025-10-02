import { ApiProperty } from '@nestjs/swagger';

export class NotFoundDto {
  message: string[];
  @ApiProperty({
    description: 'Descripción general del error.',
    example: 'Not Found',
  })
  error: string;
  @ApiProperty({
    description: 'Código HTTP de respuesta.',
    example: 404,
  })
  statusCode: number;
}
