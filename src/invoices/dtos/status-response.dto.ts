import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../enums/status.enum';

export class StatusResponseDto {
  @ApiProperty({
    description: 'Fecha de timbrado con formato ISO 8601.',
    example: '2025-09-12T15:30:00Z',
  })
  date: Date;

  @ApiProperty({
    description: 'Folio de la factura.',
    example: '3981a454-265d-40ea-b189-555dc81c35a6',
    format: 'uuid',
  })
  folio: string;

  @ApiProperty({
    description: `
      Estado de la solicitud con 5 posibles valores:
      - PENDING: declara que la factura está pendiente de timbrar.
      - COMPLETED: indica que la factura ha sido timbrada con éxito.
      ...
      `,
    example: Status.IN_PROGRESS,
    enum: Status,
  })
  status: Status;
}
