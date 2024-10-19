import { Routes, Route } from 'react-router-dom';
import { VStack } from '@chakra-ui/react';
import BasicMerkleTree from './pages/BasicMerkleTree';
import ProofValidation from './pages/ProofValidation';
import Header from './components/Header';

const App = () => {
  return (
    <>
    <VStack p={4} spacing={8}>
      <Header/>
      <Routes>
        <Route path="/" element={<BasicMerkleTree />} />
        <Route path="/proof-validation" element={<ProofValidation />} />
      </Routes>
      </VStack>
    </>
  );
};

export default App;
