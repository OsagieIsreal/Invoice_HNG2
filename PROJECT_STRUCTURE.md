# File Structure and Components Overview

## Configuration Files

### Root Level
- **`vite.config.ts`** - Vite build tool configuration
- **`tsconfig.json`** - TypeScript compiler configuration
- **`tsconfig.node.json`** - TypeScript config for build tools
- **`package.json`** - Project dependencies and npm scripts
- **`index.html`** - HTML entry point for the application
- **`eslint.config.js`** - ESLint configuration for code quality
- **`.gitignore`** - Files to exclude from git
- **`.eslintignore`** - Files to exclude from linting
- **`README.md`** - Project documentation
- **`SETUP.md`** - Installation and setup guide

## Source Code Structure

### `/src` - Main Application Code

#### Entry Points
- **`main.tsx`** - React app bootstrap and ReactDOM mount
- **`App.tsx`** - Main App component with providers (ChakraProvider, BrowserRouter)
- **`index.css`** - Global styles and CSS utilities

#### `/src/routes`
- **`AppRouter.tsx`** - React Router configuration with all routes

#### `/src/types`
- **`invoice.ts`** - TypeScript types:
  - `Invoice` - Main invoice interface
  - `InvoiceItem` - Invoice line item
  - `InvoiceStatus` - Status type ('Draft' | 'Pending' | 'Paid')

#### `/src/schemas`
- **`invoiceSchema.ts`** - Zod validation schemas:
  - `CreateInvoiceSchema` - Validates invoice form data
  - `InvoiceFormData` - Type inferred from schema

#### `/src/store`
- **`useInvoiceStore.ts`** - Zustand store for invoice management:
  - State: `invoices[]`
  - Actions: add, update, delete, markAsPaid, markAsPending, loadFromStorage, persistToStorage
  
- **`useThemeStore.ts`** - Zustand store for theme management:
  - State: `theme` ('light' | 'dark')
  - Actions: toggleTheme, loadFromStorage, persistToStorage

#### `/src/utils`
- **`helpers.ts`** - Utility functions:
  - `formatDate()` - Format dates for display
  - `formatCurrency()` - Format numbers as USD currency
  - `calculateInvoiceTotal()` - Calculate invoice total
  - `getStatusColor()` - Get badge color for invoice status
  - `validateEmail()` - Basic email validation

#### `/src/pages`
- **`Home.tsx`** - Invoice list page:
  - Displays all invoices
  - Filter functionality
  - Create new invoice button
  - Edit/Delete actions
  - Empty state handling

- **`CreateInvoice.tsx`** - Create new invoice page:
  - Invoice form wrapper
  - Submission handler
  - Navigation after creation

- **`EditInvoice.tsx`** - Edit invoice page:
  - Invoice form with initial data
  - Submission handler
  - Navigation after update
  - Toast notifications

- **`InvoiceDetail.tsx`** - Invoice detail view:
  - Display invoice information
  - Invoice items table
  - Status actions (Mark as Paid, Mark as Pending)
  - Edit/Delete buttons
  - Back navigation

#### `/src/components`

##### `/src/components/layout`
- **`Header.tsx`** - Application header:
  - Logo/Title
  - Theme toggle button
  - Fixed position at top
  
- **`Layout.tsx`** - Layout wrapper:
  - Provides consistent page structure
  - Header integration
  - Background styling for dark mode

##### `/src/components/invoice`
- **`InvoiceForm.tsx`** - Reusable invoice form component:
  - Form fields for client info
  - Date pickers
  - Dynamic items table with add/remove
  - Formik + Zod integration
  - Real-time total calculation
  - Form validation display
  
- **`InvoiceListItem.tsx`** - Invoice card in list:
  - Invoice summary display
  - Status badge
  - Client name and email
  - Due date and total amount
  - Edit/Delete buttons
  - Click to view detail

- **`InvoiceDetail.tsx`** - Invoice detail display:
  - Full invoice information
  - Client billing info
  - Complete items table
  - Invoice total
  - Notes section
  - Action buttons (Edit, Delete, Mark as Paid/Pending)
  - Back button

##### `/src/components/filters`
- **`InvoiceFilter.tsx`** - Filter button group:
  - Filter by: All, Draft, Pending, Paid
  - Active state highlighting
  - Responsive button layout
  - Hover animations

##### `/src/components/modals`
- **`ConfirmDeleteModal.tsx`** - Delete confirmation dialog:
  - Alert dialog with confirmation
  - Focus trap (accessibility)
  - Cancel/Confirm buttons
  - Loading state

##### `/src/components/common`
- **`EmptyState.tsx`** - Empty state display:
  - Title and description
  - Optional action button
  - Icon support
  - Dark mode support

#### `/src/vite-env.d.ts`
- Vite client type definitions

#### `/public`
- Static assets directory (currently empty)

## Component Hierarchy

```
App
├── ChakraProvider
└── BrowserRouter
    └── AppRouter
        └── Layout
            ├── Header
            │   ├── Logo
            │   ├── Theme Toggle
            │   └── Chakra ColorMode
            └── Routes
                ├── Home
                │   ├── InvoiceFilter
                │   ├── InvoiceListItem (x many)
                │   │   └── ConfirmDeleteModal
                │   └── EmptyState
                ├── CreateInvoice
                │   └── InvoiceForm
                │       ├── Client Info Fields
                │       ├── Date Fields
                │       ├── Items Table
                │       └── Notes Field
                ├── EditInvoice
                │   └── InvoiceForm (with initial data)
                └── InvoiceDetail
                    ├── InvoiceDetail
                    │   ├── Client Info
                    │   ├── Items Table
                    │   ├── Notes
                    │   └── Action Buttons
                    └── ConfirmDeleteModal
```

## Data Flow

1. **User Action** (Click, Form Submit, etc.)
2. **Component Handler** (onClick, onSubmit, etc.)
3. **Zustand Action** (Modify store state)
4. **LocalStorage Persist** (Save to browser storage)
5. **Component Re-render** (Zustand subscribers re-render)
6. **UI Update** (User sees changes)

## Key Features Implementation

### 1. CRUD Operations
- **Create**: Home → New Invoice → CreateInvoice page → useInvoiceStore.addInvoice()
- **Read**: Home shows list, click item → InvoiceDetail page displays
- **Update**: InvoiceListItem → Edit button → EditInvoice page → useInvoiceStore.updateInvoice()
- **Delete**: ConfirmDeleteModal → useInvoiceStore.deleteInvoice()

### 2. Status Management
- Draft → Pending: markAsPending() action
- Pending → Paid: markAsPaid() action
- Paid → (immutable): No state changes allowed
- Visual indicators: Status badges with colors

### 3. Form Validation
- Schema: Zod in `/src/schemas/invoiceSchema.ts`
- Integration: Formik with `toFormikValidationSchema()`
- Errors: Display inline with red text
- Submit: Disabled if form invalid

### 4. Filtering
- State: Local React state in Home.tsx
- Options: All, Draft, Pending, Paid
- Logic: Array filter based on invoice.status
- Empty State: Shown when no results

### 5. Theme Toggle
- Store: useThemeStore manages theme state
- Integration: Chakra UI useColorMode()
- Persistence: LocalStorage
- Header: Theme toggle button

### 6. Responsive Design
- Bootstrap Points: Chakra UI responsive props
- Mobile-first: Base styles for mobile
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

### 7. Accessibility
- Semantic HTML: Proper heading hierarchy
- ARIA Labels: Form inputs labeled
- Keyboard: Tab navigation, ESC to close modals
- Focus Management: Modal focus trap
- Colors: High contrast for readability

### 8. Persistence
- Local Storage Keys:
  - `invoices`: Array of invoice objects
  - `theme`: 'light' or 'dark'
- Load on Mount: useEffect in relevant pages
- Auto-save: Zustand persist methods

## Dependencies Overview

### Core
- **React** 18.2.0 - UI framework
- **React DOM** 18.2.0 - React web renderer
- **React Router DOM** 6.20.1 - Client-side routing

### State Management
- **Zustand** 4.4.1 - Lightweight state management
- **Formik** 2.4.5 - Form state management

### UI & Styling
- **Chakra UI** 2.8.2 - Component library
- **@emotion/react & styled** - CSS-in-JS
- **@chakra-ui/icons** - Icon components
- **Framer Motion** 10.16.16 - Animations (optional)

### Validation
- **Zod** 3.22.4 - Schema validation
- **zod-formik-adapter** 1.2.0 - Zod + Formik integration

### Build & Dev Tools
- **Vite** 5.0.8 - Build tool
- **TypeScript** 5.2.2 - Type safety
- **ESLint** 8.55.0 - Code quality
- **@vitejs/plugin-react** 4.2.1 - React support in Vite

## File Creation Summary

| File Type | Count | Location |
|-----------|-------|----------|
| Config Files | 6 | Root |
| Page Components | 4 | `/src/pages` |
| Layout Components | 2 | `/src/components/layout` |
| Invoice Components | 3 | `/src/components/invoice` |
| Filter Components | 1 | `/src/components/filters` |
| Modal Components | 1 | `/src/components/modals` |
| Common Components | 1 | `/src/components/common` |
| Zustand Stores | 2 | `/src/store` |
| Schemas | 1 | `/src/schemas` |
| Types | 1 | `/src/types` |
| Utils | 1 | `/src/utils` |
| Routes | 1 | `/src/routes` |
| Core App Files | 3 | `/src` |
| Documentation | 3 | Root |
| **Total** | **30+** | **Various** |

## Total Lines of Code

Approximately 2,500+ lines of production code including:
- Components and pages
- Type definitions
- Validation schemas
- State management
- Utility functions
- Configuration files

All code follows TypeScript best practices with full type safety and proper error handling.

---

Generated for Invoice Management Application using React + Vite + TypeScript
