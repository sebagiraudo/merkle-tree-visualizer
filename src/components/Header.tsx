import React from 'react';
import { Flex, Heading, Text, Link } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import DarkModeSwitch from './DarkModeSwitch';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => (
  <Flex justifyContent="space-between" width="100%" alignItems="center" mb={4}>
    <Heading>Merkle Tree Visualizer</Heading>
    
    <Flex alignItems="center">
    <RouterLink to="/">
        <Link mx={2}>Home</Link>
        </RouterLink>
        <RouterLink to="/proof-validation">
        <Link mx={2}>Proof Validation</Link>
    </RouterLink>
      <DarkModeSwitch />
      <Link href="https://github.com/sebagiraudo/merkle-tree-visualizer" isExternal ml={4}>
        <Flex alignItems="center">
          <FaGithub />
          <Text ml={2}>View Source Code</Text>
        </Flex>
      </Link>
    </Flex>
  </Flex>
);

export default Header;
