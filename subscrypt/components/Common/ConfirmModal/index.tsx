import { globalStore } from "@/store/global";
import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Box,
  Stack,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { FC, memo } from "react";
import { useRecoilState } from "recoil";

const inter = Inter({ subsets: ["latin"] });

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { message, onConfirm } = props;
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useRecoilState(
    globalStore.isConfirmModalOpen
  );
  const onClose = () => setIsConfirmModalOpen(false);

  return (
    <Modal
      isCentered
      isOpen={isConfirmModalOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size={"xs"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box pt="40px" pb="8px" textAlign="center">
            <Text className={inter.className}>{message}</Text>
          </Box>
        </ModalBody>
        <ModalFooter p="24px 24px 32px">
          <Stack width="100%" gap="8px" direction="row">
            <Button
              width="100%"
              colorScheme="brand"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button width="100%" colorScheme="brand" onClick={onConfirm}>
              OK
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(ConfirmModal);
