import React from 'react';
import {
  VStack,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Divider,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const Instructions: React.FC = () => {
  return (
    <VStack spacing={6} p={6} align="left" maxWidth="800px" margin="0 auto">
      <Heading as="h1" size="xl">
        How to Use the Merkle Tree Visualizer 🌳
      </Heading>

      <Divider />

      <Heading as="h2" size="lg">
        1. Generate a Merkle Tree
      </Heading>
      <Text>
        On the home page, you can generate a Merkle tree by following these steps:
      </Text>
      <List spacing={3} mt={3}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Text as="span" fontWeight="bold">Select the Number of Levels:</Text> Use the dropdown menu to choose between
          2, 3, or 4 levels for your Merkle tree.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Text as="span" fontWeight="bold">Input Leaf Data:</Text> Enter data into each of the leaf nodes. The data
          can be any string (e.g., "Alice", "Bob", "Charlie").
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Text as="span" fontWeight="bold">Observe the Tree:</Text> As you input data, the Merkle tree visualization
          updates in real-time, showing how the leaf data affects the parent nodes
          and root hash.
        </ListItem>
      </List>

      <Heading as="h2" size="lg" mt={6}>
        2. Generate and Copy a Merkle Proof
      </Heading>
      <Text>
        After creating your Merkle tree, you can generate a proof for any leaf node:
      </Text>
      <List spacing={3} mt={3}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Text as="span" fontWeight="bold">Select a Leaf Node:</Text> Find the leaf node for which you want to generate
          a proof.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Text as="span" fontWeight="bold">Click "Validate":</Text> Click the "Validate" button beneath the leaf node.
          This will automatically generate a proof and copy it to your clipboard.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Text as="span" fontWeight="bold">Navigate to Proof Validation:</Text> You will be redirected to the Proof
          Validation page with the proof data pre-filled.
        </ListItem>
      </List>

      <Heading as="h2" size="lg" mt={6}>
        3. Validate a Merkle Proof
      </Heading>
      <Text>
        On the Proof Validation page, you can verify the authenticity of the proof:
      </Text>
      <List spacing={3} mt={3}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Text as="span" fontWeight="bold">Review the Data:</Text> The root hash, leaf data, and proof are pre-populated.
          You can modify them if you want to explore.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Text as="span" fontWeight="bold">Click "Validate Proof":</Text> This will initiate the verification process.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Text as="span" fontWeight="bold">View Results:</Text> The app will display whether the proof is valid or invalid.
          The Merkle tree visualization will highlight:
          <List spacing={2} pl={8}>
            <ListItem>
              <Text as="span" fontWeight="bold">Blue Nodes:</Text> The path from the leaf to the root.
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">Yellow Nodes:</Text> The sibling nodes used in the proof.
            </ListItem>
          </List>
        </ListItem>
      </List>

      <Heading as="h2" size="lg" mt={6}>
        4. Understand the Visualization
      </Heading>
      <Text>
        The visual representation helps you see how Merkle trees and proofs work:
      </Text>
      <List spacing={3} mt={3}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Text as="span" fontWeight="bold">Nodes:</Text> Each circle represents a node in the Merkle tree.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Text as="span" fontWeight="bold">Hover for Hashes:</Text> Hover over a node to see its hash value.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Text as="span" fontWeight="bold">Colors:</Text>
          <List spacing={2} pl={8}>
            <ListItem>
              <Text as="span" fontWeight="bold">Gray:</Text> Default nodes.
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">Green:</Text> Nodes that have changed due to leaf data updates.
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">Blue:</Text> Nodes along the computed path during proof verification.
            </ListItem>
            <ListItem>
              <Text as="span" fontWeight="bold">Yellow:</Text> Sibling nodes included in the proof.
            </ListItem>
          </List>
        </ListItem>
      </List>

      <Heading as="h2" size="lg" mt={6}>
        5. Experiment and Learn
      </Heading>
      <Text>
        Feel free to experiment with different inputs and observe how the tree and
        proofs change. This is a great way to deepen your understanding of Merkle
        trees.
      </Text>
    </VStack>
  );
};

export default Instructions;
