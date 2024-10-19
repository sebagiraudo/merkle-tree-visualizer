import React from 'react';
import { Flex, Icon, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const DarkModeSwitch: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex alignItems="center">
      <Icon
        as={colorMode === 'dark' ? SunIcon : MoonIcon}
        boxSize={5}
        mr={2}
        cursor="pointer"
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default DarkModeSwitch;
