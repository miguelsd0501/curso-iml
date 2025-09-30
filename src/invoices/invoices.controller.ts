import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { PaginationDto } from './dtos/pagination.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
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
  remove(@Param('folio', ParseUUIDPipe) folio: string) {
    return this.invoicesService.cancel(folio);
  }

  @Post(':folio/addendum')
  addAddendum(@Param('folio') folio: string) {
    return 'se ha agregado con exito' + folio;
  }

  @Delete(':folio/addendum')
  removeAddendum(@Param('folio') folio: string) {
    return `se ha eliminado con exito ${folio}`;
  }
}
