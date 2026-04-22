import { Box, Flex, Heading, Button, HStack, useColorMode, Container } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useThemeStore } from '@/store/useThemeStore';
import { useEffect } from 'react';

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { theme, toggleTheme, loadFromLocalStorage } = useThemeStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  const handleToggleTheme = () => {
    toggleTheme();
    toggleColorMode();
  };

  return (
    <Box
      as="header"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      borderBottom="1px"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
      shadow="sm"
      py={4}
      sticky={1}
      top={0}
      zIndex={10}
    >
      <Container maxW="7xl">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="lg" color={colorMode === 'light' ? 'gray.900' : 'white'}>
            Invoice Manager
          </Heading>
          <HStack spacing={4}>
            <Button
              onClick={handleToggleTheme}
              variant="ghost"
              size="lg"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              aria-label="Toggle theme"
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
