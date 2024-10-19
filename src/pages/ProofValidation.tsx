// src/pages/ProofValidation.tsx

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
import {
  verifyMerkleProofWithPath,
  MerkleProofStep,
  createMerkleTree,
  MerkleNode,
} from '../utils/merkleTree';
import { useLocation } from 'react-router-dom';
import MerkleNodeComponent from '../components/MerkleNodeComponent';

const ProofValidation: React.FC = () => {
  const location = useLocation();
  const toast = useToast();

  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const rootHashParam = queryParams.get('rootHash') || '';
  const leafDataParam = queryParams.get('leafData') || '';
  const proofParam = queryParams.get('proof') || '';
  const leafDataArrayParam = queryParams.get('leafDataArray') || '';

  const [rootHash, setRootHash] = useState(decodeURIComponent(rootHashParam));
  const [leafData, setLeafData] = useState(decodeURIComponent(leafDataParam));
  const [proofInput, setProofInput] = useState(decodeURIComponent(proofParam));
  const [leafDataArray, setLeafDataArray] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [computedHashes, setComputedHashes] = useState<string[]>([]);
  const [tree, setTree] = useState<MerkleNode | null>(null);

  useEffect(() => {
    if (leafDataArrayParam) {
      const decodedLeafDataArray = JSON.parse(decodeURIComponent(leafDataArrayParam));
      setLeafDataArray(decodedLeafDataArray);
    }
  }, [leafDataArrayParam]);

  const handleValidateProof = () => {
    setErrorMessage('');
    setIsValid(null);
    setComputedHashes([]);
    setTree(null);

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

      // Verify the proof and get the computed hashes
      const { isValid, computedHashes } = verifyMerkleProofWithPath(
        leafData,
        proof,
        rootHash
      );

      setIsValid(isValid);
      setComputedHashes(computedHashes);

      if (!leafDataArray || leafDataArray.length === 0) {
        throw new Error('Leaf data is not available to reconstruct the Merkle tree.');
      }

      // Reconstruct the Merkle tree for visualization
      const levels = Math.ceil(Math.log2(leafDataArray.length)) + 1;
      const tree = createMerkleTree(levels, leafDataArray);
      setTree(tree);
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
        {!rootHash && (
          <FormErrorMessage>Root hash is required.</FormErrorMessage>
        )}
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
        {!leafData && (
          <FormErrorMessage>Leaf data is required.</FormErrorMessage>
        )}
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
        {!proofInput && (
          <FormErrorMessage>Proof is required.</FormErrorMessage>
        )}
      </FormControl>

      <Button colorScheme="blue" onClick={handleValidateProof}>
        Validate Proof
      </Button>

      {isValid !== null && (
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={isValid ? 'green.500' : 'red.500'}
        >
          {isValid ? 'Proof is valid! ✅' : 'Proof is invalid. ❌'}
        </Text>
      )}

      {errorMessage && (
        <Text fontSize="sm" color="red.500">
          {errorMessage}
        </Text>
      )}

      {tree && (
        <VStack spacing={4} width="100%">
          <Text
            fontWeight="bold"
            mt={4}
            fontFamily="'Roboto Mono', monospace"
            fontSize="16px"
          >
            Merkle Tree Visualization
          </Text>
          <MerkleNodeComponent
            node={tree}
            leafData={leafDataArray}
            onLeafDataChange={() => {}}
            isRoot
            changedNodes={[]}
            tree={tree}
            proofHashes={computedHashes} // Pass the computed hashes
          />
        </VStack>
      )}
    </VStack>
  );
};

export default ProofValidation;
