import React, { useState, useEffect } from 'react';
import { VStack, Select, Text, Button } from '@chakra-ui/react';
import { createMerkleTree, MerkleNode } from '../utils/merkleTree';
import MerkleNodeComponent from '../components/MerkleNodeComponent';
import { Link } from 'react-router-dom';

const BasicMerkleTree = () => {
  const [levels, setLevels] = useState(2);
  const [leafData, setLeafData] = useState<string[]>(Array(2 ** (2 - 1)).fill('0'));
  const [tree, setTree] = useState<MerkleNode | null>(null);
  const [changedNodes, setChangedNodes] = useState<string[]>([]);

  useEffect(() => {
    setTree(createMerkleTree(levels, leafData));
  }, [levels, leafData]);

  const handleLevelsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLevels = parseInt(e.target.value, 10);
    setLevels(newLevels);
    setLeafData(Array(2 ** (newLevels - 1)).fill('0'));
    setTree(createMerkleTree(newLevels, Array(2 ** (newLevels - 1)).fill('0')));
  };

  const handleLeafDataChange = (index: number, value: string) => {
    const newLeafData = [...leafData];
    newLeafData[index] = value;
    setLeafData(newLeafData);
    const newTree = createMerkleTree(levels, newLeafData);
    setTree(newTree);
    highlightChangedPath(index, newTree);
  };

  const highlightChangedPath = (updatedLeafIndex: number, updatedTree: MerkleNode) => {
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
          <Text fontWeight="bold" mt={4} fontFamily="'Roboto Mono', monospace" fontSize="16px">
            Root Hash: {tree.hash}
          </Text>
          <MerkleNodeComponent node={tree} leafData={leafData} onLeafDataChange={handleLeafDataChange} isRoot changedNodes={changedNodes} tree={tree} />
          <Link
           to={`/proof-validation?rootHash=${encodeURIComponent(tree.hash)}`}
           style={{ textDecoration: 'none' }}
         >
           <Button colorScheme="blue" mt={2}>
             Go to Proof Validation
           </Button>
         </Link>
        </>
      )}
    </VStack>
  );
};

export default BasicMerkleTree;