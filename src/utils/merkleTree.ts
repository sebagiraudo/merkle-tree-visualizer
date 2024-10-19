// src/utils/merkleTree.ts
import CryptoJS from 'crypto-js';

// Merkle Node structure
export interface MerkleNode {
  hash: string;
  left?: MerkleNode;
  right?: MerkleNode;
  isLeaf: boolean;
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
