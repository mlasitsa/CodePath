import React from 'react'
import type { ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { defaultSystem } from '@chakra-ui/react'

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ChakraProvider value={defaultSystem}>
      {children}
    </ChakraProvider>
  )
}

export default ThemeProvider
