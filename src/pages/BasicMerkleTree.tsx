// src/pages/BasicMerkleTree.tsx

import React, { useState, useEffect, useContext } from 'react';
import { VStack, Select, Text, Button } from '@chakra-ui/react';
import { createMerkleTree, MerkleNode } from '../utils/merkleTree';
import MerkleNodeComponent from '../components/MerkleNodeComponent';
import { LeafDataContext } from '../context/LeafDataContext';
import { Link as RouterLink } from 'react-router-dom';

const BasicMerkleTree: React.FC = () => {
  const leafDataContext = useContext(LeafDataContext);

  if (!leafDataContext) {
    throw new Error('LeafDataContext is undefined');
  }

  const { leafData, setLeafData } = leafDataContext;
  const [levels, setLevels] = useState(2);
  const [tree, setTree] = useState<MerkleNode | null>(null);
  const [changedNodes, setChangedNodes] = useState<string[]>([]);

  // Initialize leafData and tree when levels change
  useEffect(() => {
    const initialLeafCount = 2 ** (levels - 1);
    const initialLeafData = Array(initialLeafCount).fill('');
    setLeafData(initialLeafData);
    // Create the tree with the initial leaf data
    const newTree = createMerkleTree(levels, initialLeafData);
    setTree(newTree);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levels]);

  const handleLevelsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLevels = parseInt(e.target.value, 10);
    setLevels(newLevels);
  };

  const handleLeafDataChange = (index: number, value: string) => {
    const newLeafData = [...leafData];
    newLeafData[index] = value;
    setLeafData(newLeafData);
    // Create a new tree with the updated leaf data
    const newTree = createMerkleTree(levels, newLeafData);
    setTree(newTree);
    highlightChangedPath(index, newTree);
  };

  const highlightChangedPath = (
    updatedLeafIndex: number,
    updatedTree: MerkleNode
  ) => {
    const newChangedNodes: string[] = [];

    function traverseTree(node: MerkleNode, currentIndex: number): boolean {
      if (node.isLeaf && currentIndex === updatedLeafIndex) {
        newChangedNodes.push(node.hash);
        return true;
      }
      if (node.left && node.right) {
        const leftChanged = traverseTree(node.left, currentIndex * 2);
        const rightChanged = traverseTree(node.right, currentIndex * 2 + 1);
        if (leftChanged || rightChanged) {
          newChangedNodes.push(node.hash);
          return true;
        }
      }
      return false;
    }

    traverseTree(updatedTree, 0);
    setChangedNodes(newChangedNodes);
    setTimeout(() => setChangedNodes([]), 1000);
  };

  return (
    <VStack p={4} spacing={8}>
      <Select width="200px" value={levels} onChange={handleLevelsChange}>
        <option value={2}>2 Levels</option>
        <option value={3}>3 Levels</option>
        <option value={4}>4 Levels</option>
      </Select>

      {tree && (
        <>
          <Text
            fontWeight="bold"
            mt={4}
            fontFamily="'Roboto Mono', monospace"
            fontSize="16px"
          >
            Root Hash: {tree.hash}
          </Text>
          <Button
            as={RouterLink}
            to={`/proof-validation?rootHash=${encodeURIComponent(tree.hash)}`}
            colorScheme="blue"
            mt={2}
          >
            Go to Proof Validation
          </Button>
          <MerkleNodeComponent
            node={tree}
            leafData={leafData}
            onLeafDataChange={handleLeafDataChange}
            isRoot
            changedNodes={changedNodes}
            tree={tree}
          />
        </>
      )}
    </VStack>
  );
};

export default BasicMerkleTree;
