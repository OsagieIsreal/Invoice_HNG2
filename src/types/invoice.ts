export type InvoiceStatus = 'Draft' | 'Pending' | 'Paid';

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  status: InvoiceStatus;
  notes?: string;
  total: number;
  createdAt: string;
}

export interface CreateInvoicePayload {
  clientName: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  items: Omit<InvoiceItem, 'id' | 'total'>[];
  notes?: string;
}

export interface UpdateInvoicePayload extends Partial<CreateInvoicePayload> {
  status?: InvoiceStatus;
}
