// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LeafDataProvider } from './context/LeafDataContext';

document.title = 'Merkle Tree Visualizer 🌳';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <LeafDataProvider>
          <App />
        </LeafDataProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
