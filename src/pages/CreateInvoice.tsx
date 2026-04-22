import { VStack, Heading, useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { InvoiceForm } from '@/components/invoice/InvoiceForm';
import { CreateInvoicePayload } from '@/types/invoice';
import { useState } from 'react';

export const CreateInvoice = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { addInvoice } = useInvoiceStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateInvoicePayload) => {
    setIsLoading(true);
    try {
      const invoice = addInvoice(data);
      navigate(`/invoice/${invoice.id}`);
    } catch (error) {
      console.error('Error creating invoice:', error);
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
        Create New Invoice
      </Heading>
      <InvoiceForm onSubmit={handleSubmit} isLoading={isLoading} />
    </VStack>
  );
};
