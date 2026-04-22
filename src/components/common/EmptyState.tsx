import { Box, Heading, Text, Button, VStack, useColorMode } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: ReactNode;
}

export const EmptyState = ({ title, description, action, icon }: EmptyStateProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      p={12}
      textAlign="center"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      borderRadius="lg"
    >
      {icon && <Box mb={4} fontSize="4xl">{icon}</Box>}
      <Heading
        as="h3"
        size="md"
        mb={2}
        color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
      >
        {title}
      </Heading>
      <Text color={colorMode === 'light' ? 'gray.600' : 'gray.400'} mb={4}>
        {description}
      </Text>
      {action && (
        <Button colorScheme="blue" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </Box>
  );
};
