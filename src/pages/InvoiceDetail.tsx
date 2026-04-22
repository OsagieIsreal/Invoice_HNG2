import { VStack, useColorMode, useDisclosure, Center, Spinner, Heading } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { InvoiceDetail } from '@/components/invoice/InvoiceDetail';
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { useState, useEffect } from 'react';

export const InvoiceDetailPage = () => {
  const { colorMode } = useColorMode();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getInvoiceById, deleteInvoice, markAsPaid, markAsPending } = useInvoiceStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoadingInvoice, setIsLoadingInvoice] = useState(true);

  const invoice = id ? getInvoiceById(id) : undefined;

  useEffect(() => {
    setIsLoadingInvoice(false);
  }, []);

  if (isLoadingInvoice) {
    return (
      <Center minH="400px">
        <Spinner />
      </Center>
    );
  }

  if (!invoice) {
    return (
      <Center minH="400px">
        <Heading as="h2" size="lg" color="red.500">
          Invoice not found
        </Heading>
      </Center>
    );
  }

  const handleDelete = () => {
    onOpen();
  };

  const handleConfirmDelete = () => {
    deleteInvoice(id!);
    onClose();
    navigate('/');
  };

  const handleMarkAsPaid = () => {
    markAsPaid(id!);
  };

  const handleMarkAsPending = () => {
    markAsPending(id!);
  };

  return (
    <VStack spacing={8} align="stretch">
      <InvoiceDetail
        invoice={invoice}
        onEdit={() => navigate(`/edit/${id}`)}
        onDelete={handleDelete}
        onMarkAsPaid={handleMarkAsPaid}
        onMarkAsPending={handleMarkAsPending}
      />

      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirmDelete}
        invoiceId={id || ''}
      />
    </VStack>
  );
};
