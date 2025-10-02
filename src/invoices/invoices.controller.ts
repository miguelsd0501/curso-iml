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
import { Response } from 'express';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto, @Res() res: Response) {
    const response = this.invoicesService.create(createInvoiceDto);
    const newInvoiceUrl = `/api/invoices/${response.folio}/status`;
    res.header('Location', newInvoiceUrl).status(202).send(response);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.invoicesService.findAll(paginationDto);
  }

  @Get(':folio/status')
  findOne(@Param('folio', ParseUUIDPipe) folio: string) {
    return this.invoicesService.getStatus(folio);
  }

  @Delete(':folio')
  @Version('1')
  @Header('Deprecation', 'true')
  @Header('Sunset', 'Fri, 31 Dec 2025 23:59:59 GMT')
  remove(@Param('folio', ParseUUIDPipe) folio: string) {
    return this.invoicesService.cancel(folio);
  }

  @Delete(':folio')
  @HttpCode(204)
  @Version('2')
  removeV2(@Param('folio', ParseUUIDPipe) folio: string) {
    return this.invoicesService.cancelV2(folio);
  }
}
