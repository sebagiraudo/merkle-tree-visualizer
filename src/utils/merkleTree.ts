// src/utils/merkleTree.ts

import SHA256 from 'crypto-js/sha256';

export interface MerkleNode {
  hash: string;
  left: MerkleNode | null;
  right: MerkleNode | null;
  isLeaf: boolean;
}

export interface MerkleProofStep {
  direction: 'left' | 'right';
  hash: string;
}

export interface VerificationResult {
  isValid: boolean;
  computedHashes: string[];
}

export function hashFunction(data: string): string {
  return SHA256(data).toString();
}

export function createMerkleTree(levels: number, leafValues: string[]): MerkleNode {
  if (leafValues.length === 0) {
    throw new Error('Cannot create a Merkle Tree with no leaves');
  }

  // Ensure the number of leaves matches the expected count based on levels
  const expectedLeafCount = 2 ** (levels - 1);
  if (leafValues.length !== expectedLeafCount) {
    throw new Error(
      `Expected ${expectedLeafCount} leaves based on ${levels} levels, but got ${leafValues.length}`
    );
  }

  const leaves: MerkleNode[] = leafValues.map((value) => ({
    hash: hashFunction(value),
    left: null,
    right: null,
    isLeaf: true,
  }));

  return buildTree(leaves);
}

function buildTree(leaves: MerkleNode[]): MerkleNode {
  if (leaves.length === 1) {
    return leaves[0];
  }

  if (leaves.length === 0) {
    throw new Error('Cannot build tree with no leaves');
  }

  const parentNodes: MerkleNode[] = [];

  for (let i = 0; i < leaves.length; i += 2) {
    const left = leaves[i];
    const right = leaves[i + 1] || leaves[i]; // Duplicate last node if odd number of nodes

    const combinedHash = hashFunction(left.hash + right.hash);

    const parentNode: MerkleNode = {
      hash: combinedHash,
      left,
      right,
      isLeaf: false,
    };
    parentNodes.push(parentNode);
  }

  return buildTree(parentNodes);
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
        foundInRight = traverse(
          node.right,
          index + leftLeaves,
          leftLeaves
        );
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
  return proof.reverse();
}

export function verifyMerkleProofWithPath(
    leafValue: string,
    proof: MerkleProofStep[],
    rootHash: string
  ): VerificationResult {
    let computedHash = hashFunction(leafValue);
    const computedHashes = [computedHash];
    for (const step of proof.reverse()) {
      if (step.direction === 'left') {
        computedHash = hashFunction(step.hash + computedHash);
      } else {
        computedHash = hashFunction(computedHash + step.hash);
      }
      computedHashes.push(computedHash);
    }
  
    const isValid = computedHash === rootHash;
  
    return { isValid, computedHashes };
  }
