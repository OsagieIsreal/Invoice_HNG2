import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useColorMode,
  Text,
  FormErrorMessage,
  Badge,
  Select,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { CreateInvoiceSchema } from '@/schemas/invoiceSchema';
import { Invoice, CreateInvoicePayload } from '@/types/invoice';
import { calculateInvoiceTotal, formatCurrency } from '@/utils/helpers';
import { useState } from 'react';

interface InvoiceFormProps {
  onSubmit: (data: CreateInvoicePayload) => void;
  initialData?: Invoice;
  isLoading?: boolean;
  showStatusSelect?: boolean;
}

export const InvoiceForm = ({
  onSubmit,
  initialData,
  isLoading = false,
  showStatusSelect = false,
}: InvoiceFormProps) => {
  const { colorMode } = useColorMode();
  const [items, setItems] = useState(
    initialData?.items.map(({ id, total, ...rest }) => rest) || [
      { name: '', quantity: 1, price: 0 },
    ]
  );

  const formik = useFormik({
    initialValues: {
      clientName: initialData?.clientName || '',
      clientEmail: initialData?.clientEmail || '',
      issueDate: initialData?.issueDate || new Date().toISOString().split('T')[0],
      dueDate: initialData?.dueDate || new Date().toISOString().split('T')[0],
      items: items,
      notes: initialData?.notes || '',
      status: initialData?.status || 'Draft',
    },
    validationSchema: toFormikValidationSchema(CreateInvoiceSchema),
    onSubmit: (values) => {
      onSubmit({
        clientName: values.clientName,
        clientEmail: values.clientEmail,
        issueDate: values.issueDate,
        dueDate: values.dueDate,
        items: values.items,
        notes: values.notes,
      });
    },
    enableReinitialize: true,
  });

  const handleAddItem = () => {
    const newItems = [...items, { name: '', quantity: 1, price: 0 }];
    setItems(newItems);
    formik.setFieldValue('items', newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    formik.setFieldValue('items', newItems);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
    formik.setFieldValue('items', newItems);
  };

  const total = calculateInvoiceTotal(items);

  return (
    <Box
      as="form"
      onSubmit={formik.handleSubmit}
      p={6}
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderRadius="lg"
      border="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
    >
      <VStack spacing={6} align="stretch">
        {/* Client Information */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color={colorMode === 'light' ? 'gray.900' : 'white'}>
            Client Information
          </Text>
          <HStack spacing={4} align="start">
            <FormControl
              isInvalid={!!(formik.touched.clientName && formik.errors.clientName)}
              flex={1}
            >
              <FormLabel htmlFor="clientName">Client Name</FormLabel>
              <Input
                id="clientName"
                type="text"
                placeholder="Enter client name"
                {...formik.getFieldProps('clientName')}
              />
              {formik.touched.clientName && formik.errors.clientName && (
                <FormErrorMessage>{formik.errors.clientName}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              isInvalid={!!(formik.touched.clientEmail && formik.errors.clientEmail)}
              flex={1}
            >
              <FormLabel htmlFor="clientEmail">Email</FormLabel>
              <Input
                id="clientEmail"
                type="email"
                placeholder="Enter email address"
                {...formik.getFieldProps('clientEmail')}
              />
              {formik.touched.clientEmail && formik.errors.clientEmail && (
                <FormErrorMessage>{formik.errors.clientEmail}</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
        </Box>

        {/* Dates */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color={colorMode === 'light' ? 'gray.900' : 'white'}>
            Dates
          </Text>
          <HStack spacing={4} align="start">
            <FormControl
              isInvalid={!!(formik.touched.issueDate && formik.errors.issueDate)}
              flex={1}
            >
              <FormLabel htmlFor="issueDate">Issue Date</FormLabel>
              <Input
                id="issueDate"
                type="date"
                {...formik.getFieldProps('issueDate')}
              />
              {formik.touched.issueDate && formik.errors.issueDate && (
                <FormErrorMessage>{formik.errors.issueDate}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              isInvalid={!!(formik.touched.dueDate && formik.errors.dueDate)}
              flex={1}
            >
              <FormLabel htmlFor="dueDate">Due Date</FormLabel>
              <Input
                id="dueDate"
                type="date"
                {...formik.getFieldProps('dueDate')}
              />
              {formik.touched.dueDate && formik.errors.dueDate && (
                <FormErrorMessage>{formik.errors.dueDate}</FormErrorMessage>
              )}
            </FormControl>

            {showStatusSelect && (
              <FormControl flex={1}>
                <FormLabel htmlFor="status">Status</FormLabel>
                <Select id="status" {...formik.getFieldProps('status')}>
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending</option>
                  <option value="Paid" disabled={initialData?.status === 'Pending'}>
                    Paid
                  </option>
                </Select>
              </FormControl>
            )}
          </HStack>
        </Box>

        {/* Items */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4} color={colorMode === 'light' ? 'gray.900' : 'white'}>
            Invoice Items
          </Text>
          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Item Name</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Total</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {items.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      <Input
                        type="text"
                        placeholder="Item name"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        size="sm"
                      />
                    </Td>
                    <Td isNumeric>
                      <Input
                        type="number"
                        placeholder="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)
                        }
                        size="sm"
                        min={1}
                      />
                    </Td>
                    <Td isNumeric>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(index, 'price', parseFloat(e.target.value) || 0)
                        }
                        size="sm"
                        step="0.01"
                      />
                    </Td>
                    <Td isNumeric fontWeight="semibold">
                      {formatCurrency(item.quantity * item.price || 0)}
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="Delete item"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleRemoveItem(index)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          {formik.touched.items && formik.errors.items && (
            <Text color="red.500" fontSize="sm" mt={2}>
              {formik.errors.items}
            </Text>
          )}
          <Button
            leftIcon={<AddIcon />}
            onClick={handleAddItem}
            mt={4}
            variant="outline"
            size="sm"
          >
            Add Item
          </Button>
        </Box>

        {/* Notes */}
        <FormControl>
          <FormLabel htmlFor="notes">Notes</FormLabel>
          <Textarea
            id="notes"
            placeholder="Additional notes (optional)"
            {...formik.getFieldProps('notes')}
            rows={4}
          />
        </FormControl>

        {/* Summary */}
        <Box
          p={4}
          bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
          borderRadius="md"
          textAlign="right"
        >
          <Text fontSize="lg" fontWeight="bold" color={colorMode === 'light' ? 'gray.900' : 'white'}>
            Total: <Badge colorScheme="green" fontSize="lg" px={3} py={1}>{formatCurrency(total)}</Badge>
          </Text>
        </Box>

        {/* Submit Button */}
        <HStack spacing={4} justify="flex-end">
          <Button variant="outline" type="reset" onClick={() => formik.resetForm()}>
            Reset
          </Button>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}
            isDisabled={!formik.isValid || items.length === 0}
          >
            {initialData ? 'Update Invoice' : 'Create Invoice'}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
