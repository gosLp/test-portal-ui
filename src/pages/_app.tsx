import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import theme from '../theme'
import Background from '../components/Background'

function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient();
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
        {/* <Background/> */}
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
