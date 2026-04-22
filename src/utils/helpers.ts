export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateInvoiceTotal = (items: Array<{ quantity: number; price: number }>): number => {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Draft':
      return 'gray';
    case 'Pending':
      return 'yellow';
    case 'Paid':
      return 'green';
    default:
      return 'gray';
  }
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
