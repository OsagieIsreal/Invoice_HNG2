import { z } from 'zod';

const InvoiceItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  quantity: z.number().positive('Quantity must be a positive number'),
  price: z.number().positive('Price must be a positive number'),
});

export const CreateInvoiceSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Email must be valid'),
  issueDate: z.string().min(1, 'Issue date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  items: z.array(InvoiceItemSchema).min(1, 'At least one item is required'),
  notes: z.string().optional(),
  status: z.enum(['Draft', 'Pending', 'Paid']).optional(),
});

export type InvoiceFormData = z.infer<typeof CreateInvoiceSchema>;
