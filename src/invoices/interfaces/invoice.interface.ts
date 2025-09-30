import { Status } from '../enums/status.enum';

export interface Invoice {
  rfc: string;
  folio: string;
  date: Date;
  customer: string;
  seller: string;
  quantity: number; // cantidad de unidades de un producto
  unitPrice: number;
  total: number;
  description?: string;
  status: Status;
}
