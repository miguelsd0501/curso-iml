import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @Get(':folio/status')
  findOne(@Param('folio') folio: string) {
    return this.invoicesService.findOne(folio);
  }

  @Delete(':folio')
  remove(@Param('folio') folio: string) {
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
