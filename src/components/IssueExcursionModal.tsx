import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";

type IssueExcursionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function IssueExcursionModal({ isOpen, onClose }: IssueExcursionModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Issue Excursion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={3}>
              <FormControl as="fieldset">
                <FormLabel>Received By</FormLabel>
                <Input></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Issued Date</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  defaultValue="2023-1-18"
                  type="datetime-local"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default IssueExcursionModal;
