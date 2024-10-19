import React from 'react';
import {
  Box,
  Grid,
  Input,
  Tooltip,
  VStack,
  useToast,
  Button,
} from '@chakra-ui/react';
import { MerkleNode, getMerkleProof } from '../utils/merkleTree';
import { useNavigate } from 'react-router-dom';

interface MerkleNodeComponentProps {
  node: MerkleNode;
  leafData: string[];
  onLeafDataChange: (index: number, value: string) => void;
  index?: number;
  isRoot?: boolean;
  changedNodes: string[];
  tree: MerkleNode;
  proofHashes?: string[];
}

const MerkleNodeComponent: React.FC<MerkleNodeComponentProps> = ({
  node,
  leafData,
  onLeafDataChange,
  index = 0,
  changedNodes = [],
  tree,
  proofHashes = [],
}) => {
  const toast = useToast();
  const navigate = useNavigate();

  const copyHashToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast({
      title: 'Hash copied to clipboard!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleValidateAndCopy = () => {
    const totalLeaves = leafData.length;
    const proof = getMerkleProof(tree, index, totalLeaves);

    // Copy the proof to the clipboard
    const proofString = JSON.stringify(proof, null, 2);
    navigator.clipboard.writeText(proofString);
    toast({
      title: 'Proof copied to clipboard!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    const encodedLeafDataArray = encodeURIComponent(JSON.stringify(leafData));

    // Navigate to the Proof Validation page with rootHash, proof, and leaf data in the URL
    const encodedProof = encodeURIComponent(proofString);
    navigate(
        `/proof-validation?rootHash=${encodeURIComponent(
            tree.hash
        )}&leafData=${encodeURIComponent(
            leafData[index]
        )}&proof=${encodedProof}&leafDataArray=${encodedLeafDataArray}`
    );
  };

  const isChanged = changedNodes.includes(node.hash);
  const isInProofPath = proofHashes.includes(node.hash);

  return (
    <VStack spacing={4} position="relative">
      {/* Tooltip to display the hash on hover */}
      <Tooltip label={`Hash: ${node.hash}`} placement="top" hasArrow>
        <Box
          as="button"
          onClick={() => copyHashToClipboard(node.hash)}
          borderWidth="2px"
          borderRadius="full"
          width="50px"
          height="50px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg={
            isInProofPath
              ? 'blue.300'
              : isChanged
              ? 'green.300'
              : 'gray.300'
          }
          _hover={{
            bg: isInProofPath
              ? 'blue.400'
              : isChanged
              ? 'green.400'
              : 'gray.400',
          }}
        />
      </Tooltip>

      {node.isLeaf && (
        <>
          <Input
            placeholder={`Leaf ${index + 1} data`}
            value={leafData[index]}
            onChange={(e) => onLeafDataChange(index, e.target.value)}
          />
          <Button size="sm" onClick={handleValidateAndCopy}>
            Validate
          </Button>
        </>
      )}

      {node.left && node.right && (
        <Grid templateColumns="repeat(2, 1fr)" gap={6} position="relative">
          <MerkleNodeComponent
            node={node.left}
            leafData={leafData}
            onLeafDataChange={onLeafDataChange}
            index={index * 2}
            changedNodes={changedNodes}
            tree={tree}
            proofHashes={proofHashes}
          />
          <MerkleNodeComponent
            node={node.right}
            leafData={leafData}
            onLeafDataChange={onLeafDataChange}
            index={index * 2 + 1}
            changedNodes={changedNodes}
            tree={tree}
            proofHashes={proofHashes}
          />
        </Grid>
      )}
    </VStack>
  );
};

export default MerkleNodeComponent;
