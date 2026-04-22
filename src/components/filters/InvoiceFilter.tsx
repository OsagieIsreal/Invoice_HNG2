import { HStack, Button, useColorMode } from '@chakra-ui/react';
import { InvoiceStatus } from '@/types/invoice';

interface FilterProps {
  activeFilter: InvoiceStatus | 'All';
  onFilterChange: (filter: InvoiceStatus | 'All') => void;
}

export const InvoiceFilter = ({ activeFilter, onFilterChange }: FilterProps) => {
  const { colorMode } = useColorMode();
  const filters: Array<InvoiceStatus | 'All'> = ['All', 'Draft', 'Pending', 'Paid'];

  return (
    <HStack spacing={2} wrap="wrap">
      {filters.map((filter) => (
        <Button
          key={filter}
          onClick={() => onFilterChange(filter)}
          variant={activeFilter === filter ? 'solid' : 'outline'}
          colorScheme={activeFilter === filter ? 'blue' : 'gray'}
          size="sm"
          _hover={{
            transform: 'translateY(-2px)',
            shadow: 'md',
          }}
          transition="all 0.2s"
        >
          {filter}
        </Button>
      ))}
    </HStack>
  );
};
