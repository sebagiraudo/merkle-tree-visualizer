import React from 'react';
import { Flex, Heading, Text, Link, IconButton } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import DarkModeSwitch from './DarkModeSwitch';
import { Link as RouterLink } from 'react-router-dom';
import InstructionsModal from './InstructionsModal'; // Import the InstructionsModal
import { InfoIcon } from '@chakra-ui/icons'; // Import the InfoIcon

const Header: React.FC = () => (
  <Flex justifyContent="space-between" width="100%" alignItems="center" mb={4}>
    {/* Application Title */}
    <Heading>Merkle Tree Visualizer</Heading>
    
    {/* Navigation and Controls */}
    <Flex alignItems="center">
      {/* Home Link */}
      <RouterLink to="/">
        <Link mx={2}>Home</Link>
      </RouterLink>
      
      {/* Proof Validation Link */}
      <RouterLink to="/proof-validation">
        <Link mx={2}>Proof Validation</Link>
      </RouterLink>
      
      {/* Dark Mode Switch */}
      <DarkModeSwitch />
      
      {/* Instructions Modal with Info Icon */}
      <InstructionsModal />
      
      {/* GitHub Link */}
      <Link
        href="https://github.com/sebagiraudo/merkle-tree-visualizer"
        isExternal
        ml={4}
      >
        <Flex alignItems="center">
          <FaGithub />
          <Text ml={2}>View Source Code</Text>
        </Flex>
      </Link>
    </Flex>
  </Flex>
);

export default Header;
