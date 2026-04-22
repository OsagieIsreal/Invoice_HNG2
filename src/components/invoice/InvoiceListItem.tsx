import {
  Box,
  Flex,
  Heading,
  HStack,
  Badge,
  Button,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { Invoice } from '@/types/invoice';
import { formatDate, formatCurrency, getStatusColor } from '@/utils/helpers';
import { useNavigate } from 'react-router-dom';

interface InvoiceListItemProps {
  invoice: Invoice;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const InvoiceListItem = ({ invoice, onEdit, onDelete }: InvoiceListItemProps) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/invoice/${invoice.id}`);
  };

  return (
    <Box
      p={6}
      border="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      borderRadius="lg"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      cursor="pointer"
      _hover={{
        shadow: 'lg',
        transform: 'translateY(-2px)',
      }}
      transition="all 0.2s"
      onClick={handleClick}
    >
      <Flex justify="space-between" align="start" mb={4}>
        <VStack align="start" spacing={1} flex={1}>
          <Heading size="md" color={colorMode === 'light' ? 'gray.900' : 'white'}>
            #{invoice.id}
          </Heading>
          <Text color={colorMode === 'light' ? 'gray.600' : 'gray.400'} fontSize="sm">
            {invoice.clientName}
          </Text>
        </VStack>
        <Badge
          colorScheme={getStatusColor(invoice.status)}
          borderRadius="full"
          px={3}
          py={1}
        >
          {invoice.status}
        </Badge>
      </Flex>

      <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
        <VStack align="start" spacing={1}>
          <Text fontSize="xs" color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
            Due Date
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color={colorMode === 'light' ? 'gray.900' : 'white'}>
            {formatDate(invoice.dueDate)}
          </Text>
        </VStack>

        <VStack align="start" spacing={1}>
          <Text fontSize="xs" color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
            Total
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color={colorMode === 'light' ? 'gray.900' : 'white'}>
            {formatCurrency(invoice.total)}
          </Text>
        </VStack>

        <HStack spacing={2} ml="auto">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(invoice.id);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(invoice.id);
            }}
          >
            Delete
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};
