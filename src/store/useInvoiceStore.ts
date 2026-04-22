import { create } from 'zustand';
import { Invoice, CreateInvoicePayload, UpdateInvoicePayload, InvoiceStatus } from '@/types/invoice';

interface InvoiceStore {
  invoices: Invoice[];
  addInvoice: (payload: CreateInvoicePayload) => Invoice;
  updateInvoice: (id: string, payload: UpdateInvoicePayload) => void;
  deleteInvoice: (id: string) => void;
  getInvoiceById: (id: string) => Invoice | undefined;
  markAsPaid: (id: string) => void;
  markAsPending: (id: string) => void;
  loadFromLocalStorage: () => void;
  persistToLocalStorage: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useInvoiceStore = create<InvoiceStore>((set, get) => ({
  invoices: [],

  addInvoice: (payload) => {
    const total = payload.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    
    const newInvoice: Invoice = {
      id: generateId(),
      clientName: payload.clientName,
      clientEmail: payload.clientEmail,
      issueDate: payload.issueDate,
      dueDate: payload.dueDate,
      items: payload.items.map(item => ({
        ...item,
        id: generateId(),
        total: item.quantity * item.price,
      })),
      status: 'Draft',
      notes: payload.notes,
      total,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      invoices: [...state.invoices, newInvoice],
    }));
    get().persistToLocalStorage();
    return newInvoice;
  },

  updateInvoice: (id, payload) => {
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id
          ? {
              ...invoice,
              ...payload,
              items: payload.items
                ? payload.items.map(item => ({
                    ...item,
                    id: item.id || generateId(),
                    total: item.quantity * item.price,
                  }))
                : invoice.items,
              total: payload.items
                ? payload.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
                : invoice.total,
            }
          : invoice
      ),
    }));
    get().persistToLocalStorage();
  },

  deleteInvoice: (id) => {
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
    }));
    get().persistToLocalStorage();
  },

  getInvoiceById: (id) => {
    return get().invoices.find((invoice) => invoice.id === id);
  },

  markAsPaid: (id) => {
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, status: 'Paid' as InvoiceStatus } : invoice
      ),
    }));
    get().persistToLocalStorage();
  },

  markAsPending: (id) => {
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id && invoice.status === 'Draft'
          ? { ...invoice, status: 'Pending' as InvoiceStatus }
          : invoice
      ),
    }));
    get().persistToLocalStorage();
  },

  loadFromLocalStorage: () => {
    const stored = localStorage.getItem('invoices');
    if (stored) {
      set({ invoices: JSON.parse(stored) });
    }
  },

  persistToLocalStorage: () => {
    localStorage.setItem('invoices', JSON.stringify(get().invoices));
  },
}));
