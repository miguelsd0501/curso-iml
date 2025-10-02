import { Status } from '../enums/status.enum';

export class StatusResponseDto {
  date: Date;
  folio: string;
  status: Status;
}
