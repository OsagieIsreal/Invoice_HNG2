import { VStack, Heading, useColorMode, useToast, Spinner, Center } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { InvoiceForm } from '@/components/invoice/InvoiceForm';
import { CreateInvoicePayload } from '@/types/invoice';
import { useState, useEffect } from 'react';

export const EditInvoice = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const { getInvoiceById, updateInvoice } = useInvoiceStore();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (data: CreateInvoicePayload) => {
    setIsLoading(true);
    try {
      updateInvoice(id!, {
        ...data,
        status: invoice.status,
      });
      toast({
        title: 'Success',
        description: 'Invoice updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(`/invoice/${id}`);
    } catch (error) {
      console.error('Error updating invoice:', error);
      toast({
        title: 'Error',
        description: 'Failed to update invoice',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={8} align="stretch">
      <Heading
        as="h1"
        size="2xl"
        color={colorMode === 'light' ? 'gray.900' : 'white'}
      >
        Edit Invoice #{invoice.id}
      </Heading>
      <InvoiceForm
        onSubmit={handleSubmit}
        initialData={invoice}
        isLoading={isLoading}
      />
    </VStack>
  );
};
