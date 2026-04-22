# Setup and Installation Guide

## Quick Start

### Step 1: Install Dependencies

Open a terminal in the project root directory and run:

```bash
npm install
```

This will install all required packages:
- React, React DOM, and Vite
- Chakra UI and its dependencies
- TypeScript
- Zustand for state management
- Formik for form handling
- Zod for validation
- React Router DOM
- Framer Motion for animations

### Step 2: Start Development Server

```bash
npm run dev
```

The application will automatically open in your default browser at `http://localhost:5173`.

### Step 3: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Project Structure Explained

### `/src/components`
Reusable React components organized by feature:
- **common/**: General-purpose components (EmptyState, etc.)
- **invoice/**: Invoice-specific components (InvoiceListItem, InvoiceForm, InvoiceDetail)
- **layout/**: Layout components (Header, Layout wrapper)
- **modals/**: Modal components (ConfirmDeleteModal)
- **filters/**: Filter components (InvoiceFilter)

### `/src/pages`
Route-aware page components:
- **Home.tsx**: Invoice list view with filtering
- **CreateInvoice.tsx**: Form to create new invoices
- **EditInvoice.tsx**: Form to edit existing invoices
- **InvoiceDetail.tsx**: Detailed view of a single invoice

### `/src/store`
Zustand store management:
- **useInvoiceStore.ts**: Manages invoice CRUD operations and LocalStorage persistence
- **useThemeStore.ts**: Manages theme (light/dark) and persistence

### `/src/schemas`
Data validation schemas:
- **invoiceSchema.ts**: Zod validation schema for invoice forms

### `/src/types`
TypeScript type definitions:
- **invoice.ts**: Invoice, InvoiceItem, and related types

### `/src/utils`
Utility helper functions:
- **helpers.ts**: Date formatting, currency formatting, status colors, etc.

### `/src/routes`
Routing configuration:
- **AppRouter.tsx**: React Router setup with all routes

## Key Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite configuration |
| `tsconfig.json` | TypeScript configuration |
| `package.json` | Project dependencies and scripts |
| `index.html` | HTML entry point |
| `src/main.tsx` | React app bootstrap |
| `src/App.tsx` | Main App component with provider setup |
| `src/index.css` | Global styles |

## How the Application Works

### Data Flow

1. **User creates an invoice** → Form captures data
2. **Form validates** using Zod schema
3. **Valid data** → Zustand store updates invoices array
4. **Store persists** data to LocalStorage
5. **Component re-renders** with new data
6. **User can filter/view/edit** invoices from list

### State Management

The application uses Zustand for global state management:

```typescript
// Get store instance
const store = useInvoiceStore();

// Available actions
store.addInvoice(payload);          // Create invoice
store.updateInvoice(id, payload);   // Update invoice
store.deleteInvoice(id);            // Delete invoice
store.markAsPaid(id);               // Mark as paid
store.markAsPending(id);            // Mark as pending
store.getInvoiceById(id);           // Get single invoice
```

### Form Validation

Forms use Formik + Zod for validation:

1. Formik handles form state and submissions
2. Zod validates data structure and values
3. Validation errors display inline
4. Submit button disabled if form invalid

### Routing

React Router DOM handles client-side routing:

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Invoice list with filtering |
| `/new` | CreateInvoice | Create new invoice form |
| `/invoice/:id` | InvoiceDetail | View invoice details |
| `/edit/:id` | EditInvoice | Edit existing invoice |

### Theming

Chakra UI provides theme switching:

1. `useThemeStore` manages theme state
2. `useColorMode()` from Chakra UI applies theme
3. Theme preference saved to LocalStorage
4. Automatic apply on page reload

## Common Tasks

### Creating a New Component

1. Create file in appropriate `/src/components` subdirectory
2. Import necessary Chakra UI components
3. Use `useColorMode()` for dark mode support
4. Export component

Example:
```typescript
import { Box, useColorMode } from '@chakra-ui/react';

export const MyComponent = () => {
  const { colorMode } = useColorMode();
  
  return (
    <Box bg={colorMode === 'light' ? 'white' : 'gray.800'}>
      {/* Component content */}
    </Box>
  );
};
```

### Adding a New Route

1. Create a new page component in `/src/pages`
2. Add route to `/src/routes/AppRouter.tsx`

Example:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

### Accessing Store in Component

```typescript
import { useInvoiceStore } from '@/store/useInvoiceStore';

function MyComponent() {
  const invoices = useInvoiceStore(state => state.invoices);
  const addInvoice = useInvoiceStore(state => state.addInvoice);
  
  // Use invoices and addInvoice...
}
```

## Troubleshooting

### Issue: Port 5173 already in use

**Solution**: Vite will automatically use the next available port. Check the terminal output for the actual URL.

### Issue: Changes not reflecting

**Solution**: 
1. Ensure you're in the correct terminal directory
2. Verify the dev server is still running
3. Try refreshing the browser (F5 or Cmd+R)

### Issue: Type errors in TypeScript

**Solution**: 
1. Check imports match file paths
2. Ensure components are properly exported
3. Run `npm run build` to get full error report

### Issue: Form validation not working

**Solution**:
1. Check Zod schema in `/src/schemas/invoiceSchema.ts`
2. Verify Formik integration in component
3. Check validation schema exports properly

### Issue: LocalStorage not persisting data

**Solution**:
1. Check browser's LocalStorage is enabled
2. Clear browser cache: Dev Tools → Application → LocalStorage → Clear All
3. Verify `persistToLocalStorage()` is being called

## Environment Variables

Currently, no environment variables are needed. For future use, create a `.env` file:

```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Invoice Manager
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Tips

1. **Optimize Components**: Use `React.memo()` for expensive components
2. **Lazy Loading**: Use `React.lazy()` for route components
3. **State Management**: Only subscribe to store values you need
4. **Avoid Re-renders**: Use proper dependency arrays in hooks

## Code Quality

### Linting

Run ESLint to check code:
```bash
npm run lint
```

### Formatting (Optional)

To enable automatic formatting, install Prettier:
```bash
npm install -D prettier
```

Then add to scripts in `package.json`:
```json
"format": "prettier --write \"./**/*.{ts,tsx,json,css,md}\""
```

## Next Steps

1. ✓ Install dependencies
2. ✓ Start dev server
3. ✓ Test creating an invoice
4. ✓ Try the dark mode toggle
5. ✓ Build for production

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Chakra UI Documentation](https://chakra-ui.com)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Formik Documentation](https://formik.org)
- [Zod Documentation](https://zod.dev)
- [React Router Documentation](https://reactrouter.com)

---

**Happy coding!** 🚀
