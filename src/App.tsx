import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { useThemeStore } from './store/useThemeStore';
import { useEffect } from 'react';

function App() {
  const { theme, loadFromLocalStorage } = useThemeStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme} />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
