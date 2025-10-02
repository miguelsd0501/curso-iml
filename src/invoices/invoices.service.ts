import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { Invoice } from './interfaces/invoice.interface';
import { v4 as uuid } from 'uuid';
import { Status } from './enums/status.enum';
import { PaginationDto } from './dtos/pagination.dto';
import { StatusResponseDto } from './dtos/status-response.dto';

@Injectable()
export class InvoicesService {
  private invoices: Invoice[] = [
    {
      folio: '008cf164-f6ef-4958-b27a-add712089c29',
      rfc: 'ASDF991208UU9',
      date: new Date('2025-09-12T15:30:00.000Z'),
      customer: 'Miguel Santiago',
      seller: 'Juan Perez',
      quantity: 4,
      unitPrice: 4.5,
      total: 18,
      status: Status.COMPLETED,
    },
  ];

  create(createInvoiceDto: CreateInvoiceDto) {
    const invoiceToSave: Invoice = {
      folio: uuid(),
      ...createInvoiceDto,
      status: Status.IN_PROGRESS,
    };
    this.validateInvoice(invoiceToSave);
    this.invoices.push(invoiceToSave);
    // Lanzar en segundo plano el timbrado
    setTimeout(() => void this.stamp(invoiceToSave));
    return invoiceToSave;
  }

  getStatus(folio: string): StatusResponseDto {
    const invoice = this.invoices.find((invoice) => invoice.folio === folio);
    if (!invoice) throw new NotFoundException();
    return {
      status: invoice.status,
      date: invoice.date,
      folio: invoice.folio,
    } as StatusResponseDto;
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;

    const start = (page - 1) * limit;
    const end = start + limit;
    const data = this.invoices.slice(start, end);

    return {
      data,
      total: this.invoices.length,
      page,
      limit,
      totalPages: Math.ceil(this.invoices.length / limit),
    };
  }

  cancel(folio: string) {
    this.getStatus(folio);
    return this.invoices.filter((invoice) => invoice.folio !== folio);
  }

  cancelV2(folio: string) {
    return 'implementar' + folio;
  }

  private validateInvoice(invoice: Invoice) {
    const exists = this.invoices.some(
      (inv) =>
        inv.rfc === invoice.rfc &&
        inv.date.getTime() === invoice.date.getTime(), // comparar fechas exactas
    );

    if (exists) {
      throw new ConflictException(
        `An invoice with RFC ${invoice.rfc} and date ${invoice.date.toISOString()} already exists`,
      );
    }
  }

  private async stamp(invoice: Invoice) {
    await new Promise((res) => setTimeout(res, 20000));
    invoice.status = Status.COMPLETED;
    console.log(`Factura realizada, folio: ${invoice.folio}`);
  }
}
