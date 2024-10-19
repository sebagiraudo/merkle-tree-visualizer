import React, { useState, useEffect } from 'react';
import {
  VStack,
  Input,
  Textarea,
  Button,
  Text,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { verifyMerkleProof, MerkleProofStep } from '../utils/merkleTree';
import { useLocation } from 'react-router-dom';

const ProofValidation: React.FC = () => {
  const location = useLocation();

  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const rootHashParam = queryParams.get('rootHash') || '';
  const leafDataParam = queryParams.get('leafData') || '';
  const proofParam = queryParams.get('proof') || '';

  const [rootHash, setRootHash] = useState(rootHashParam);
  const [leafData, setLeafData] = useState(leafDataParam);
  const [proofInput, setProofInput] = useState(decodeURIComponent(proofParam));
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();

  const handleValidateProof = () => {
    setErrorMessage('');
    setIsValid(null);

    try {
      const proof: MerkleProofStep[] = JSON.parse(proofInput);
      const formattedProof = JSON.stringify(proof, null, 2);
      setProofInput(formattedProof);

      if (
        !Array.isArray(proof) ||
        !proof.every(
          (step) =>
            'direction' in step &&
            'hash' in step &&
            (step.direction === 'left' || step.direction === 'right') &&
            typeof step.hash === 'string'
        )
      ) {
        throw new Error('Invalid proof format');
      }

      const result = verifyMerkleProof(leafData, proof, rootHash);

      setIsValid(result);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || 'An error occurred during validation');
      toast({
        title: 'Error',
        description: error.message || 'An error occurred during validation',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={6} p={4} width="80%" maxWidth="1200px" margin="0 auto">
      <FormControl isInvalid={!rootHash && !!errorMessage}>
        <FormLabel>Root Hash</FormLabel>
        <Input
          value={rootHash}
          onChange={(e) => setRootHash(e.target.value)}
          placeholder="Enter the expected root hash"
          width="100%"
          maxWidth="1000px"
        />
        {!rootHash && <FormErrorMessage>Root hash is required.</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={!leafData && !!errorMessage}>
        <FormLabel>Leaf Data</FormLabel>
        <Input
          value={leafData}
          onChange={(e) => setLeafData(e.target.value)}
          placeholder="Enter the leaf data"
          width="100%"
          maxWidth="1000px"
        />
        {!leafData && <FormErrorMessage>Leaf data is required.</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={!proofInput && !!errorMessage}>
        <FormLabel>Proof</FormLabel>
        <Textarea
          value={proofInput}
          onChange={(e) => setProofInput(e.target.value)}
          placeholder='Enter the proof as a JSON array, e.g., [{"direction":"left","hash":"..."}]'
          size="sm"
          rows={10}
          width="100%"
          maxWidth="1000px"
        />
        {!proofInput && <FormErrorMessage>Proof is required.</FormErrorMessage>}
      </FormControl>

      <Button colorScheme="blue" onClick={handleValidateProof}>
        Validate Proof
      </Button>

      {isValid !== null && (
        <Text fontSize="lg" fontWeight="bold" color={isValid ? 'green.500' : 'red.500'}>
          {isValid ? 'Proof is valid! ✅' : 'Proof is invalid. ❌'}
        </Text>
      )}

      {errorMessage && (
        <Text fontSize="sm" color="red.500">
          {errorMessage}
        </Text>
      )}
    </VStack>
  );
};

export default ProofValidation;
