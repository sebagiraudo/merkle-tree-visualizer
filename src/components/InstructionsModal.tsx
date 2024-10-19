import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons'; // Import the InfoIcon
import Instructions from '../pages/Instructions'; // Adjust the import path

const InstructionsModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<InfoIcon />}
        aria-label="Instructions"
        onClick={onOpen}
        variant="ghost"
        mx={2}
        height={10}
        width={10}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How to Use the Merkle Tree Visualizer 🌳</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Instructions />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InstructionsModal;
