import { Box, Container, useColorMode } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { colorMode } = useColorMode();

  return (
    <Box minH="100vh" bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
      <Header />
      <Container maxW="7xl" py={8}>
        {children}
      </Container>
    </Box>
  );
};
