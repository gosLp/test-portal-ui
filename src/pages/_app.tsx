import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from '../components/layouts/main';

import theme from '../theme'
import Background from '../components/Background'

function MyApp({ Component, pageProps, router }) {

  const queryClient = new QueryClient();
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout router={router}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        
        <QueryClientProvider client={queryClient}>
        
          <Component {...pageProps}  key={router.route}/>
         
        </QueryClientProvider>
        
        {/* <Background/> */}
      </ColorModeProvider>
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
