import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  Res,
  Version,
  Header,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { PaginationDto } from './dtos/pagination.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AsyncResponse } from './dtos/async-response.dto';
import { BadRequestDto } from './dtos/client-errors/bad-request.dto';
import { NotFoundDto } from './dtos/client-errors/not-found.dto';
import { StatusResponseDto } from './dtos/status-response.dto';
import { Response } from 'express';

@Controller('invoices')
@ApiTags('invoices') // Agrupa los endpoints bajo esta etiqueta
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva factura',
    description: `
      Crea de forma asincrona una factura electrónica y retorna el estado de la operación.  

      ## Reglas de negocio
      ...

      ## Campos con información sensible
      ...
    `,
  })
  @ApiCreatedResponse({
    description: 'La solicitud se ha recibido con éxito.',
    type: AsyncResponse,
  })
  @ApiBadRequestResponse({
    description: `
    Bad Request — La factura no puede ser creada por errores de lado del cliente.  

    Posibles causas:
    ...
    `,
    type: BadRequestDto,
  })
  @ApiConflictResponse({
    description: `
    Conflict — La factura no puede ser creada por que ya se tiene registrada una solicitud con el mismo RFC y fecha.  

    Posibles causas:
    ...
    `,
    type: BadRequestDto,
  })
  create(@Body() createInvoiceDto: CreateInvoiceDto, @Res() res: Response) {
    const response = this.invoicesService.create(createInvoiceDto);
    const newInvoiceUrl = `/api/invoices/${response.folio}/status`;
    res.header('Location', newInvoiceUrl).status(202).send(response);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las facturas',
    description:
      'Retorna una lista páginada (default 10) de las facturas realizadas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de facturas',
    schema: {
      type: 'object',
      required: ['data', 'pagination'],
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              folio: {
                type: 'string',
                format: 'uuid',
                example: 'f1a5e123-b123-456c-b789-abc123456789',
              }, // Escribir los demas propiedades
            },
          },
        },
        pagination: {
          type: 'object',
          properties: {
            total: { type: 'integer', example: 10 },
            page: { type: 'integer', default: 1, example: 1 },
            limit: { type: 'integer', default: 10, example: 10 },
            totalPages: { type: 'integer', example: 3 },
          },
        },
      },
    },
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.invoicesService.findAll(paginationDto);
  }

  @Get(':folio/status')
  @ApiOperation({
    summary: 'Obtener el status de una factura por medio del folio',
    description:
      'Obtiene el status de una factura por medio del folio, sirve para conocer el estado del timbrado',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna el status de una factura',
    type: StatusResponseDto,
  })
  @ApiNotFoundResponse({
    description: `
    Not Found — La factura no fue encontrada.  

    Posibles causas:
    ...
    `,
    type: NotFoundDto,
  })
  findOne(@Param('folio', ParseUUIDPipe) folio: string) {
    return this.invoicesService.getStatus(folio);
  }

  @Delete(':folio')
  @Version('1')
  @Header('Deprecation', 'true')
  @Header('Sunset', 'Fri, 31 Dec 2025 23:59:59 GMT')
  @ApiOperation({
    summary: 'Realizar la cancelación de una factura',
    description: 'Realiza la cancelación de una factura en caso de ...',
  })
  @ApiResponse({ status: 200, description: 'Factura cancelada con éxito' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  remove(@Param('folio', ParseUUIDPipe) folio: string) {
    return this.invoicesService.cancel(folio);
  }

  @Delete(':folio')
  @HttpCode(204)
  @Version('2')
  @ApiOperation({
    summary: 'Realizar la cancelación de una factura',
    description: 'Realiza la cancelación de una factura en caso de ...',
  })
  @ApiResponse({ status: 204, description: 'Factura cancelada con éxito' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada' })
  removeV2(@Param('folio', ParseUUIDPipe) folio: string) {
    return this.invoicesService.cancelV2(folio);
  }
}
