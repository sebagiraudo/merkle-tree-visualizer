import { Routes, Route, Link } from 'react-router-dom';
import { Flex, Text, IconButton } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import BasicMerkleTree from './pages/BasicMerkleTree';
import ProofValidation from './pages/ProofValidation';

const App = () => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl">Merkle Tree Visualizer</Text>
        <Flex alignItems="center">
          <Link to="/">Basic Merkle Tree</Link>
          <Link to="/proof-validation" style={{ marginLeft: '16px' }}>Proof Validation</Link>
          <IconButton
            as="a"
            href="https://github.com"
            target="_blank"
            aria-label="GitHub Source Code"
            icon={<FaGithub />}
            size="lg"
            variant="ghost"
            ml={4}
          />
        </Flex>
      </Flex>

      <Routes>
        <Route path="/" element={<BasicMerkleTree />} />
        <Route path="/proof-validation" element={<ProofValidation />} />
      </Routes>
    </>
  );
};

export default App;
