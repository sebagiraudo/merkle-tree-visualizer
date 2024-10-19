import React from 'react';
import { Box, Grid, Input, Tooltip, VStack, useToast, Button } from '@chakra-ui/react';
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
}

const MerkleNodeComponent: React.FC<MerkleNodeComponentProps> = ({
  node,
  leafData,
  onLeafDataChange,
  index = 0,
  changedNodes = [],
  tree,
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

//  const copyProofToClipboard = () => {
//    const totalLeaves = leafData.length;
//    const proof = getMerkleProof(tree, index, totalLeaves);
//    navigator.clipboard.writeText(JSON.stringify(proof));
//    toast({
//      title: 'Proof copied to clipboard!',
//      status: 'success',
//      duration: 2000,
//      isClosable: true,
//    });
//  };

  const handleValidateAndCopy = () => {
       const totalLeaves = leafData.length;
       const proof = getMerkleProof(tree, index, totalLeaves);
    
       const proofString = JSON.stringify(proof);
       navigator.clipboard.writeText(proofString);
       toast({
         title: 'Proof copied to clipboard!',
         status: 'success',
         duration: 2000,
         isClosable: true,
       });
    
       // Navigate to the Proof Validation page with rootHash, proof, and leaf data in the URL
       const encodedProof = encodeURIComponent(proofString);
       const encodedLeafData = encodeURIComponent(leafData[index]);
       navigate(`/proof-validation?rootHash=${tree.hash}&leafData=${encodedLeafData}&proof=${encodedProof}`);
     };

  const isChanged = changedNodes.includes(node.hash);

  return (
    <VStack spacing={4} position="relative">
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
          bg={isChanged ? 'green.300' : 'gray.300'}
          _hover={{ bg: isChanged ? 'green.400' : 'gray.400' }}
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
          />
          <MerkleNodeComponent
            node={node.right}
            leafData={leafData}
            onLeafDataChange={onLeafDataChange}
            index={index * 2 + 1}
            changedNodes={changedNodes}
           tree={tree}
          />
        </Grid>
      )}
    </VStack>
  );
};

export default MerkleNodeComponent;
