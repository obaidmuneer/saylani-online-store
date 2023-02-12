import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme'
import { ColorModeScript } from '@chakra-ui/react'
import ContextProvider from './context/context';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);