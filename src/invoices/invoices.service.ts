import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './interfaces/invoice.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class InvoicesService {
  private invoices: Invoice[] = [];

  create(createInvoiceDto: CreateInvoiceDto) {
    const invoiceToSave: Invoice = {
      folio: uuid(),
      ...createInvoiceDto,
    };

    this.invoices.push(invoiceToSave);
    return invoiceToSave;
  }

  findOne(folio: string) {
    const invoice = this.invoices.find((invoice) => invoice.folio === folio);
    if (!invoice) throw new NotFoundException();

    return invoice;
  }

  findAll() {
    return this.invoices;
  }

  cancel(folio: string) {
    this.findOne(folio);
    return this.invoices.filter((invoice) => invoice.folio !== folio);
  }
}
