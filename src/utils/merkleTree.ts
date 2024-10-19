// src/utils/merkleTree.ts
import CryptoJS from 'crypto-js';

// Merkle Node structure
export interface MerkleNode {
  hash: string;
  left?: MerkleNode;
  right?: MerkleNode;
  isLeaf: boolean;
}

export interface MerkleProofStep {
    direction: 'left' | 'right';
    hash: string;
}

// Create Merkle Tree with levels and data
export function createMerkleTree(levels: number, leafData: string[]): MerkleNode {
  if (levels < 2 || levels > 4) throw new Error('Levels must be between 2 and 4');

  // Create leaf nodes
  const leaves: MerkleNode[] = leafData.map(data => ({
    hash: CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex),
    isLeaf: true,
  }));

  // Build tree by recursively pairing nodes
  function buildTree(nodes: MerkleNode[]): MerkleNode[] {
    if (nodes.length === 1) return nodes;
    const parentNodes: MerkleNode[] = [];
    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i];
      const right = nodes[i + 1];
      const parentHash = CryptoJS.SHA256(left.hash + (right ? right.hash : '')).toString(CryptoJS.enc.Hex);
      parentNodes.push({ hash: parentHash, left, right, isLeaf: false });
    }
    return buildTree(parentNodes);
  }

  return buildTree(leaves)[0]; // Root of the tree
}

export function getMerkleProof(
    root: MerkleNode,
    leafIndex: number,
    totalLeaves: number
  ): MerkleProofStep[] {
    const proof: MerkleProofStep[] = [];
  
    function traverse(
      node: MerkleNode,
      index: number,
      levelSize: number
    ): boolean {
      if (node.isLeaf && index === leafIndex) {
        return true;
      }
  
      if (node.left && node.right) {
        const leftLeaves = levelSize / 2;
        let foundInLeft = false;
        let foundInRight = false;
  
        if (leafIndex < index + leftLeaves) {
          foundInLeft = traverse(node.left, index, leftLeaves);
          if (foundInLeft) {
            // Sibling is on the right
            proof.push({
              direction: 'right',
              hash: node.right.hash,
            });
            return true;
          }
        } else {
          foundInRight = traverse(node.right, index + leftLeaves, leftLeaves);
          if (foundInRight) {
            // Sibling is on the left
            proof.push({
              direction: 'left',
              hash: node.left.hash,
            });
            return true;
          }
        }
      }
  
      return false;
    }
  
    traverse(root, 0, totalLeaves);
    return proof;
  }