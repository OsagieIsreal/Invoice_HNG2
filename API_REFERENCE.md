# Invoice Management App - Complete API Documentation

## Table of Contents
1. [Type Definitions](#type-definitions)
2. [Zustand Stores](#zustand-stores)
3. [Components](#components)
4. [Pages](#pages)
5. [Validation Schemas](#validation-schemas)
6. [Utility Functions](#utility-functions)

---

## Type Definitions (`/src/types/invoice.ts`)

### InvoiceStatus
```typescript
type InvoiceStatus = 'Draft' | 'Pending' | 'Paid';
```
Enum representing the three possible statuses for an invoice.

### InvoiceItem
```typescript
interface InvoiceItem {
  id: string;              // Unique identifier
  name: string;            // Item/service name
  quantity: number;        // Number of units
  price: number;           // Price per unit
  total: number;           // Calculated total (quantity * price)
}
```
Represents a line item in an invoice.

### Invoice
```typescript
interface Invoice {
  id: string;              // Unique invoice ID
  clientName: string;      // Client's name (required)
  clientEmail: string;     // Client's email
  issueDate: string;       // Invoice issue date (YYYY-MM-DD)
  dueDate: string;         // Invoice due date (YYYY-MM-DD)
  items: InvoiceItem[];    // Array of invoice items
  status: InvoiceStatus;   // Current status
  notes?: string;          // Optional notes
  total: number;           // Invoice total amount
  createdAt: string;       // Creation timestamp (ISO 8601)
}
```
Main invoice data structure.

### CreateInvoicePayload
```typescript
interface CreateInvoicePayload {
  clientName: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  items: Omit<InvoiceItem, 'id' | 'total'>[];  // Items without id/total
  notes?: string;
}
```
Data structure for creating a new invoice (without auto-generated fields).

### UpdateInvoicePayload
```typescript
interface UpdateInvoicePayload extends Partial<CreateInvoicePayload> {
  status?: InvoiceStatus;
}
```
Data structure for updating an invoice (all fields optional plus status).

---

## Zustand Stores

### useInvoiceStore (`/src/store/useInvoiceStore.ts`)

#### State
```typescript
invoices: Invoice[]  // Array of all invoices
```

#### Methods

##### `addInvoice(payload: CreateInvoicePayload): Invoice`
Creates and returns a new invoice.
```typescript
const invoice = useInvoiceStore(state => state.addInvoice)({
  clientName: 'John Doe',
  clientEmail: 'john@example.com',
  issueDate: '2024-01-15',
  dueDate: '2024-02-15',
  items: [{ name: 'Service', quantity: 1, price: 100 }]
});
```

##### `updateInvoice(id: string, payload: UpdateInvoicePayload): void`
Updates an existing invoice.
```typescript
store.updateInvoice(invoiceId, {
  clientName: 'Updated Name',
  status: 'Pending'
});
```

##### `deleteInvoice(id: string): void`
Deletes an invoice by ID.
```typescript
store.deleteInvoice(invoiceId);
```

##### `getInvoiceById(id: string): Invoice | undefined`
Retrieves a single invoice by ID.
```typescript
const invoice = store.getInvoiceById(invoiceId);
```

##### `markAsPaid(id: string): void`
Changes invoice status to 'Paid' (from any status).
```typescript
store.markAsPaid(invoiceId);
```

##### `markAsPending(id: string): void`
Changes invoice status to 'Pending' (only from 'Draft').
```typescript
store.markAsPending(invoiceId);
```

##### `loadFromLocalStorage(): void`
Loads persisted invoices from browser LocalStorage.
```typescript
store.loadFromLocalStorage();
```

##### `persistToLocalStorage(): void`
Saves current invoices to browser LocalStorage.
```typescript
store.persistToLocalStorage();
```

#### Usage Example
```typescript
import { useInvoiceStore } from '@/store/useInvoiceStore';

function MyComponent() {
  // Get state
  const invoices = useInvoiceStore(state => state.invoices);
  
  // Get actions
  const addInvoice = useInvoiceStore(state => state.addInvoice);
  const deleteInvoice = useInvoiceStore(state => state.deleteInvoice);
  
  // Or get everything
  const store = useInvoiceStore();
}
```

---

### useThemeStore (`/src/store/useThemeStore.ts`)

#### State
```typescript
theme: 'light' | 'dark'  // Current theme
```

#### Methods

##### `toggleTheme(): void`
Toggles between light and dark theme.
```typescript
store.toggleTheme();
```

##### `loadFromLocalStorage(): void`
Loads saved theme preference.
```typescript
store.loadFromLocalStorage();
```

##### `persistToLocalStorage(): void`
Saves current theme to LocalStorage.
```typescript
store.persistToLocalStorage();
```

#### Usage Example
```typescript
import { useThemeStore } from '@/store/useThemeStore';
import { useColorMode } from '@chakra-ui/react';

function MyComponent() {
  const { toggleColorMode } = useColorMode();
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  
  const handleToggleTheme = () => {
    toggleTheme();
    toggleColorMode();
  };
}
```

---

## Components

### Layout Components

#### `<Layout />`
Main layout wrapper with header and content area.
```typescript
<Layout>
  <YourContent />
</Layout>
```
**Props**: 
- `children: ReactNode` - Content to display

**Features**: Responsive background, sticky header

#### `<Header />`
Application header with logo and theme toggle.
```typescript
export const Header = () => { ... }
```
**Features**: Sticky position, theme toggle button, responsive layout

---

### Invoice Components

#### `<InvoiceListItem />`
Renders a single invoice in compact list format.
```typescript
<InvoiceListItem
  invoice={invoice}
  onEdit={(id) => handleEdit(id)}
  onDelete={(id) => handleDelete(id)}
/>
```
**Props**:
- `invoice: Invoice` - The invoice to display
- `onEdit: (id: string) => void` - Edit action handler
- `onDelete: (id: string) => void` - Delete action handler

**Features**: Hover effects, status badge, quick action buttons

#### `<InvoiceForm />`
Comprehensive form for creating/editing invoices.
```typescript
<InvoiceForm
  onSubmit={(data) => handleSubmit(data)}
  initialData={invoice}
  isLoading={false}
  showStatusSelect={false}
/>
```
**Props**:
- `onSubmit: (data: CreateInvoicePayload) => void` - Form submission handler
- `initialData?: Invoice` - Pre-fill form with existing invoice
- `isLoading?: boolean` - Show loading state on submit button
- `showStatusSelect?: boolean` - Show status dropdown (for edit only)

**Features**: 
- Dynamic item table with add/remove items
- Real-time total calculation
- Formik + Zod validation
- Inline error messages
- Dark mode support

#### `<InvoiceDetail />`
Full invoice detail view with all information.
```typescript
<InvoiceDetail
  invoice={invoice}
  onEdit={(id) => handleEdit(id)}
  onDelete={(id) => handleDelete(id)}
  onMarkAsPaid={(id) => handleMarkAsPaid(id)}
  onMarkAsPending={(id) => handleMarkAsPending(id)}
/>
```
**Props**:
- `invoice: Invoice` - Invoice to display
- `onEdit: (id: string) => void` - Edit handler
- `onDelete: (id: string) => void` - Delete handler
- `onMarkAsPaid: (id: string) => void` - Mark as paid handler
- `onMarkAsPending: (id: string) => void` - Mark as pending handler

**Features**: Complete invoice information, items table, status actions

---

### Filter Components

#### `<InvoiceFilter />`
Filter buttons for invoice status filtering.
```typescript
<InvoiceFilter
  activeFilter="All"
  onFilterChange={(filter) => setFilter(filter)}
/>
```
**Props**:
- `activeFilter: InvoiceStatus | 'All'` - Currently active filter
- `onFilterChange: (filter) => void` - Filter change handler

**Options**: All, Draft, Pending, Paid

---

### Modal Components

#### `<ConfirmDeleteModal />`
Confirmation dialog for invoice deletion.
```typescript
<ConfirmDeleteModal
  isOpen={isOpen}
  onClose={onClose}
  onConfirm={handleConfirm}
  invoiceId={invoiceId}
  isLoading={false}
/>
```
**Props**:
- `isOpen: boolean` - Modal visibility
- `onClose: () => void` - Close handler
- `onConfirm: () => void` - Confirm deletion handler
- `invoiceId: string` - Invoice ID being deleted
- `isLoading?: boolean` - Loading state

**Features**: Focus trap, ESC to close, styled alert dialog

---

### Common Components

#### `<EmptyState />`
Display when no data available.
```typescript
<EmptyState
  title="No invoices"
  description="Create your first invoice"
  action={{
    label: 'Create',
    onClick: handleCreate
  }}
  icon={<AddIcon />}
/>
```
**Props**:
- `title: string` - Heading text
- `description: string` - Description text
- `action?: { label: string; onClick: () => void }` - Optional action button
- `icon?: ReactNode` - Optional icon display

---

## Pages

### Home
Route: `/`
```typescript
<Home />
```
**Features**:
- Invoice list with filtering
- New invoice button
- Edit/Delete actions per invoice
- Empty state handling

### CreateInvoice
Route: `/new`
```typescript
<CreateInvoice />
```
**Features**:
- Empty invoice form
- Submission handling with store integration
- Navigation after success

### EditInvoice
Route: `/edit/:id`
```typescript
<EditInvoice />
```
**Features**:
- Pre-filled invoice form
- Validation on update
- Toast notifications
- Invoice not found handling

### InvoiceDetailPage
Route: `/invoice/:id`
```typescript
<InvoiceDetailPage />
```
**Features**:
- Full invoice display
- Status management actions
- Edit/Delete options
- Delete confirmation modal

---

## Validation Schemas

### CreateInvoiceSchema (`/src/schemas/invoiceSchema.ts`)

```typescript
const CreateInvoiceSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Email must be valid'),
  issueDate: z.string().min(1, 'Issue date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  items: z.array(z.object({
    name: z.string().min(1, 'Item name is required'),
    quantity: z.number().positive('Quantity must be positive'),
    price: z.number().positive('Price must be positive'),
  })).min(1, 'At least one item is required'),
  notes: z.string().optional(),
  status: z.enum(['Draft', 'Pending', 'Paid']).optional(),
});

type InvoiceFormData = z.infer<typeof CreateInvoiceSchema>;
```

**Validation Rules**:
- `clientName`: Required, non-empty string
- `clientEmail`: Required, valid email format
- `issueDate`: Required, non-empty string
- `dueDate`: Required, non-empty string
- `items`: Required array with at least 1 item
  - `name`: Non-empty string per item
  - `quantity`: Positive number per item
  - `price`: Positive number per item
- `notes`: Optional string
- `status`: Optional, one of three status values

**Usage with Formik**:
```typescript
const formik = useFormik({
  validationSchema: toFormikValidationSchema(CreateInvoiceSchema),
  // ... other formik config
});
```

---

## Utility Functions

### formatDate(dateString: string): string
Formats ISO date string to readable format (e.g., "Jan 15, 2024").
```typescript
const formatted = formatDate('2024-01-15');  // Jan 15, 2024
```

### formatCurrency(amount: number): string
Formats number as USD currency (e.g., "$1,000.00").
```typescript
const formatted = formatCurrency(1000);  // $1,000.00
```

### calculateInvoiceTotal(items: Array<{ quantity, price }>): number
Calculates total from items array.
```typescript
const total = calculateInvoiceTotal(invoiceItems);
```

### getStatusColor(status: string): string
Returns Chakra UI color scheme for status badge.
```typescript
const color = getStatusColor('Paid');     // 'green'
const color = getStatusColor('Pending');  // 'yellow'
const color = getStatusColor('Draft');    // 'gray'
```

**Returns**: 'gray' | 'yellow' | 'green'

### validateEmail(email: string): boolean
Basic email validation check.
```typescript
const isValid = validateEmail('user@example.com');  // true
```

---

## Styling & Theme

### Dark Mode Support
All components use Chakra UI's `useColorMode()`:
```typescript
const { colorMode } = useColorMode();

return (
  <Box bg={colorMode === 'light' ? 'white' : 'gray.800'}>
    Content
  </Box>
);
```

### Responsive Props
Chakra UI responsive props for mobile-first design:
```typescript
<Box
  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
  flexDirection={{ base: 'column', md: 'row' }}
/>
```

---

## Error Handling

### Form Validation Errors
Errors display inline under form fields:
```typescript
{formik.touched.fieldName && formik.errors.fieldName && (
  <FormErrorMessage>{formik.errors.fieldName}</FormErrorMessage>
)}
```

### Invoice Not Found
Pages handle missing invoices gracefully:
```typescript
if (!invoice) {
  return <Center><Heading color="red.500">Invoice not found</Heading></Center>;
}
```

### Toast Notifications
Edit page shows success/error toasts:
```typescript
toast({
  title: 'Success',
  description: 'Invoice updated',
  status: 'success',
  duration: 3000,
});
```

---

## Performance Considerations

### Zustand Optimization
Subscribe to only needed store values:
```typescript
// Good - only re-render when invoices change
const invoices = useInvoiceStore(state => state.invoices);

// Avoid - subscribes to entire store
const store = useInvoiceStore();
```

### Memoization Ready
Components can be wrapped with `React.memo()` if needed:
```typescript
export const InvoiceListItem = React.memo(({ invoice, onEdit, onDelete }) => {
  // Component code
});
```

---

## Testing Guide

### Test Creating Invoice
```typescript
const { addInvoice } = useInvoiceStore();
const invoice = addInvoice({
  clientName: 'Test',
  clientEmail: 'test@example.com',
  issueDate: '2024-01-01',
  dueDate: '2024-02-01',
  items: [{ name: 'Item', quantity: 1, price: 100 }]
});
expect(invoice.status).toBe('Draft');
```

### Test Status Transitions
```typescript
const { markAsPending, markAsPaid } = useInvoiceStore();
markAsPending(invoiceId);
// Invoice status should now be 'Pending'
markAsPaid(invoiceId);
// Invoice status should now be 'Paid'
```

### Test Filtering
```typescript
const filteredInvoices = invoices.filter(inv => inv.status === 'Paid');
```

---

## Troubleshooting API Issues

### Store not persisting
**Check**: Call `persistToLocalStorage()` after mutations
**Verify**: LocalStorage is enabled in browser
**Clear**: `localStorage.clear()` to reset

### Form validation not working
**Check**: Proper Formik `getFieldProps()` binding
**Verify**: Zod schema exports correctly
**Debug**: `console.log(formik.errors)` to see validation errors

### Theme not toggling
**Check**: Both `toggleColorMode()` and `toggleTheme()` called
**Verify**: ChakraProvider wraps app
**Clear**: LocalStorage theme entry to reset

---

## Version Compatibility

- React: 18.2.0+
- TypeScript: 5.2.0+
- Chakra UI: 2.8.0+
- Zustand: 4.4.0+
- Zod: 3.22.0+

---

## Additional Notes

- All dates use YYYY-MM-DD format
- Currency always in USD (modifiable in utils)
- IDs generated with random string method
- All data persisted to browser LocalStorage
- No backend API calls required

---

**Last Updated**: January 2024
**API Version**: 1.0.0
