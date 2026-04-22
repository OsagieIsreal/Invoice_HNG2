import {
  VStack,
  HStack,
  Button,
  Box,
  Heading,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { InvoiceStatus } from '@/types/invoice';
import { InvoiceListItem } from '@/components/invoice/InvoiceListItem';
import { InvoiceFilter } from '@/components/filters/InvoiceFilter';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { AddIcon } from '@chakra-ui/icons';

export const Home = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { invoices, loadFromLocalStorage, deleteInvoice } = useInvoiceStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filter, setFilter] = useState<InvoiceStatus | 'All'>('All');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === 'All') return true;
    return invoice.status === filter;
  });

  const handleDelete = (id: string) => {
    setSelectedInvoiceId(id);
    onOpen();
  };

  const handleConfirmDelete = () => {
    if (selectedInvoiceId) {
      deleteInvoice(selectedInvoiceId);
      onClose();
      setSelectedInvoiceId(null);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  return (
    <VStack spacing={8} align="stretch">
      {/* Header with Create Button */}
      <HStack justify="space-between" align="start" flexWrap="wrap">
        <VStack align="start" spacing={2}>
          <Heading
            as="h1"
            size="2xl"
            color={colorMode === 'light' ? 'gray.900' : 'white'}
          >
            Invoices
          </Heading>
          <Text color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
            Total: {invoices.length}
          </Text>
        </VStack>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          size="lg"
          onClick={() => navigate('/new')}
        >
          New Invoice
        </Button>
      </HStack>

      {/* Filter */}
      <Box>
        <InvoiceFilter
          activeFilter={filter}
          onFilterChange={setFilter}
        />
      </Box>

      {/* Invoices List */}
      <VStack spacing={4} align="stretch">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <InvoiceListItem
              key={invoice.id}
              invoice={invoice}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <Box
            p={12}
            textAlign="center"
            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            borderRadius="lg"
          >
            <Heading
              as="h3"
              size="md"
              mb={2}
              color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
            >
              No invoices found
            </Heading>
            <Text color={colorMode === 'light' ? 'gray.600' : 'gray.400'} mb={4}>
              {filter === 'All'
                ? 'Create your first invoice to get started'
                : `No ${filter.toLowerCase()} invoices`}
            </Text>
            {filter === 'All' && (
              <Button
                colorScheme="blue"
                onClick={() => navigate('/new')}
                leftIcon={<AddIcon />}
              >
                Create Invoice
              </Button>
            )}
          </Box>
        )}
      </VStack>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirmDelete}
        invoiceId={selectedInvoiceId || ''}
      />
    </VStack>
  );
};
