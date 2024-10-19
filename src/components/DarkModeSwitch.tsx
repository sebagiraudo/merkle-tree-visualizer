import React from 'react';
import { Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const DarkModeSwitch: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex alignItems="center">
      <IconButton
        icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        boxSize={5}
        mr={2}
        onClick={toggleColorMode}
        aria-label='Toggle Dark Mode'
        variant="ghost"
        height={10}
        width={10}
      />
    </Flex>
  );
};

export default DarkModeSwitch;
