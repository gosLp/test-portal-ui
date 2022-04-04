import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'

import theme from '../theme'
import Background from '../components/Background'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
        {/* <Background/> */}
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
