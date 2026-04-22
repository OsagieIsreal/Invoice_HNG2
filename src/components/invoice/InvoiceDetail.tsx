import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Badge,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  useColorMode,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Invoice } from '@/types/invoice';
import { formatDate, formatCurrency, getStatusColor } from '@/utils/helpers';
import { useNavigate } from 'react-router-dom';

interface InvoiceDetailProps {
  invoice: Invoice;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onMarkAsPaid: (id: string) => void;
  onMarkAsPending: (id: string) => void;
}

export const InvoiceDetail = ({
  invoice,
  onEdit,
  onDelete,
  onMarkAsPaid,
  onMarkAsPending,
}: InvoiceDetailProps) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const canChangeStatus = invoice.status !== 'Paid';

  return (
    <Box
      p={8}
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderRadius="lg"
      border="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
    >
      {/* Header */}
      <Flex justify="space-between" align="start" mb={8}>
        <VStack align="start" spacing={2}>
          <Heading as="h1" size="2xl" color={colorMode === 'light' ? 'gray.900' : 'white'}>
            Invoice #{invoice.id}
          </Heading>
          <Text color={colorMode === 'light' ? 'gray.600' : 'gray.400'} fontSize="sm">
            Created on {formatDate(invoice.createdAt)}
          </Text>
        </VStack>
        <Badge
          colorScheme={getStatusColor(invoice.status)}
          borderRadius="full"
          px={4}
          py={2}
          fontSize="md"
        >
          {invoice.status}
        </Badge>
      </Flex>

      {/* Client Info */}
      <Grid templateColumns="repeat(2, 1fr)" gap={8} mb={8}>
        <Box>
          <Text fontSize="xs" fontWeight="bold" color={colorMode === 'light' ? 'gray.600' : 'gray.400'} textTransform="uppercase">
            Bill To
          </Text>
          <Heading as="h3" size="md" mt={2} color={colorMode === 'light' ? 'gray.900' : 'white'}>
            {invoice.clientName}
          </Heading>
          <Text color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>{invoice.clientEmail}</Text>
        </Box>

        <Box>
          <VStack align="start" spacing={3}>
            <Box>
              <Text fontSize="xs" fontWeight="bold" color={colorMode === 'light' ? 'gray.600' : 'gray.400'} textTransform="uppercase">
                Issue Date
              </Text>
              <Text fontSize="lg" fontWeight="semibold" color={colorMode === 'light' ? 'gray.900' : 'white'}>
                {formatDate(invoice.issueDate)}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="bold" color={colorMode === 'light' ? 'gray.600' : 'gray.400'} textTransform="uppercase">
                Due Date
              </Text>
              <Text fontSize="lg" fontWeight="semibold" color={colorMode === 'light' ? 'gray.900' : 'white'}>
                {formatDate(invoice.dueDate)}
              </Text>
            </Box>
          </VStack>
        </Box>
      </Grid>

      <Divider my={8} />

      {/* Items Table */}
      <Box mb={8} overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Item</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {invoice.items.map((item) => (
              <Tr key={item.id}>
                <Td fontWeight="semibold">{item.name}</Td>
                <Td isNumeric>{item.quantity}</Td>
                <Td isNumeric>{formatCurrency(item.price)}</Td>
                <Td isNumeric fontWeight="bold">{formatCurrency(item.total)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Divider my={8} />

      {/* Summary */}
      <Flex justify="flex-end" mb={8}>
        <Box w="full" maxW="300px">
          <Flex justify="space-between" mb={2}>
            <Text>Subtotal:</Text>
            <Text>{formatCurrency(invoice.total)}</Text>
          </Flex>
          <Flex justify="space-between" fontWeight="bold" fontSize="lg" pt={2} borderTop="2px" borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}>
            <Text>Total:</Text>
            <Text color="green.500">{formatCurrency(invoice.total)}</Text>
          </Flex>
        </Box>
      </Flex>

      {/* Notes */}
      {invoice.notes && (
        <>
          <Divider my={8} />
          <Box>
            <Heading as="h4" size="sm" mb={2} color={colorMode === 'light' ? 'gray.900' : 'white'}>
              Notes
            </Heading>
            <Text color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>{invoice.notes}</Text>
          </Box>
        </>
      )}

      <Divider my={8} />

      {/* Actions */}
      <HStack spacing={4} justify="flex-end">
        <Button variant="outline" onClick={() => navigate('/')}>
          Back
        </Button>
        <Button variant="outline" onClick={() => onEdit(invoice.id)}>
          Edit
        </Button>
        {invoice.status === 'Draft' && (
          <Button colorScheme="blue" onClick={() => onMarkAsPending(invoice.id)}>
            Mark as Pending
          </Button>
        )}
        {invoice.status === 'Pending' && (
          <Button colorScheme="green" onClick={() => onMarkAsPaid(invoice.id)}>
            Mark as Paid
          </Button>
        )}
        <Button colorScheme="red" variant="outline" onClick={() => onDelete(invoice.id)}>
          Delete
        </Button>
      </HStack>
    </Box>
  );
};
