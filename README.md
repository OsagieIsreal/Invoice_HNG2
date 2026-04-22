# Invoice Management Application

A modern, full-featured Invoice Management Application built with React, Vite, TypeScript, and Chakra UI.

## Features

✅ **CRUD Operations**
- Create, read, update, and delete invoices
- Form validation with Zod
- Error handling with clear feedback

✅ **Invoice Status Management**
- Draft → Pending → Paid workflow
- Status transitions with validation
- Visual status indicators

✅ **Filtering**
- Filter invoices by: All, Draft, Pending, Paid
- Real-time filtering
- Empty state messaging

✅ **Theme Support**
- Light/Dark mode toggle
- Theme persistence in LocalStorage
- Integrated with Chakra UI theming

✅ **Responsive Design**
- Mobile-first approach
- Support for 320px+ screens
- Responsive tables and layouts
- No horizontal scrolling

✅ **Accessibility**
- Semantic HTML structure
- ARIA labels
- Keyboard navigation support
- Focus trapping in modals
- ESC key to close modals

✅ **Data Persistence**
- LocalStorage integration
- Automatic saving of invoices
- Theme preference persistence

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Library**: Chakra UI
- **State Management**: Zustand
- **Form Handling**: Formik
- **Validation**: Zod
- **Routing**: React Router DOM
- **Animations**: Framer Motion (optional)

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── invoice/          # Invoice-specific components
│   ├── layout/           # Layout wrapper and header
│   ├── modals/           # Modal components
│   └── filters/          # Filter components
├── pages/
│   ├── Home.tsx          # Invoice list page
│   ├── CreateInvoice.tsx # Create invoice page
│   ├── EditInvoice.tsx   # Edit invoice page
│   └── InvoiceDetail.tsx # Invoice detail view
├── store/
│   ├── useInvoiceStore.ts    # Invoice state management
│   └── useThemeStore.ts      # Theme state management
├── schemas/
│   └── invoiceSchema.ts      # Zod validation schemas
├── types/
│   └── invoice.ts            # TypeScript type definitions
├── utils/
│   └── helpers.ts            # Helper functions
├── routes/
│   └── AppRouter.tsx         # Route definitions
├── App.tsx                   # Main App component
└── main.tsx                  # Entry point
```

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Install peer dependencies if needed**
   ```bash
   npm install zod-formik-adapter
   ```

## Getting Started

### Development Server

Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Creating an Invoice

1. Click the "New Invoice" button on the home page
2. Fill in the client information
3. Add invoice items with quantities and prices
4. Optionally add notes
5. Click "Create Invoice"

### Editing an Invoice

1. From the invoice list, click "Edit" on any invoice
2. Modify the invoice details
3. Click "Update Invoice"

### Managing Invoice Status

- **Draft → Pending**: Click "Mark as Pending" button on detail view
- **Pending → Paid**: Click "Mark as Paid" button on detail view
- **Paid**: Status cannot be changed back

### Filtering Invoices

Use the filter buttons at the top of the invoice list to view:
- All invoices
- Draft invoices only
- Pending invoices only
- Paid invoices only

### Theme Toggle

Click the sun/moon icon in the header to switch between light and dark mode. Your preference is automatically saved.

## Form Validation

The application validates:
- ✓ Client name (required)
- ✓ Email (valid email format)
- ✓ At least one invoice item (required)
- ✓ Quantity (must be positive)
- ✓ Price (must be positive)
- ✓ Dates (required)

Validation errors are displayed inline with clear messages.

## Data Persistence

All invoices and preferences are automatically saved to your browser's LocalStorage. Data persists between sessions.

### LocalStorage Keys
- `invoices`: Array of invoice objects
- `theme`: Current theme preference ('light' or 'dark')

## State Management with Zustand

### Invoice Store (`useInvoiceStore`)

```typescript
const store = useInvoiceStore();

// Methods
store.addInvoice(payload)           // Create new invoice
store.updateInvoice(id, payload)    // Update invoice
store.deleteInvoice(id)             // Delete invoice
store.getInvoiceById(id)            // Get single invoice
store.markAsPaid(id)                // Mark as paid
store.markAsPending(id)             // Mark as pending
store.loadFromLocalStorage()        // Load from storage
store.persistToLocalStorage()       // Save to storage
```

### Theme Store (`useThemeStore`)

```typescript
const store = useThemeStore();

// Methods
store.toggleTheme()                 // Toggle light/dark mode
store.loadFromLocalStorage()        // Load theme preference
store.persistToLocalStorage()       // Save theme preference
```

## Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

All components use Chakra UI's responsive props for proper scaling.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- PDF invoice export
- Email invoice functionality
- Invoice templates
- Payment tracking
- Multi-currency support
- Recurring invoices
- Client management
- Tax calculations
- Analytics dashboard

## Troubleshooting

### Dependencies Not Installing

If you encounter issues installing dependencies:

```bash
npm cache clean --force
npm install
```

### LocalStorage Issues

To clear all stored data:

```javascript
localStorage.removeItem('invoices');
localStorage.removeItem('theme');
```

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port.

## Performance

The application uses:
- Zustand for efficient state updates (only re-renders affected components)
- Code splitting via Vite
- Lazy loading of routes
- Optimized re-renders with React hooks
- CSS-in-JS with Chakra UI for minimal bundle size

## Accessibility Features

- ✓ Semantic HTML elements
- ✓ ARIA labels on all form inputs
- ✓ Proper heading hierarchy
- ✓ Keyboard navigation support
- ✓ Focus indicators
- ✓ Modal focus trap
- ✓ ESC key closes modals
- ✓ Color contrast compliance
- ✓ Screen reader friendly

## License

MIT

## Support

For issues or questions, please refer to the component documentation in each file.

---

Built with ❤️ using React, Vite, and Chakra UI
