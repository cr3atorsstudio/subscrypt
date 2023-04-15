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
import { FaCcVisa } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

const CardInfoModal: FC = () => {
  const [isCardInfoModalOpen, setIsCardInfoModalOpen] = useRecoilState(
    globalStore.isCardInfoModalOpen
  );
  const onClose = () => setIsCardInfoModalOpen(false);

  return (
    <Modal
      isCentered
      isOpen={isCardInfoModalOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size={"xs"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box pt="24px" pb="8px" textAlign="center">
            <Text
              className={inter.className}
              pb="16px"
              fontWeight={600}
              lineHeight={1.2}
            >
              Use this card <br /> to pay for your subscription
            </Text>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-end"}
              backgroundColor={"#a9b0ff"}
              borderRadius="6px"
              p="16px"
              style={{ aspectRatio: "1.586 / 1" }}
            >
              <Box>
                <Text
                  className={inter.className}
                  fontSize={"20px"}
                  pb="10px"
                  letterSpacing={"0.1rem"}
                  color={"#fff"}
                  filter={"drop-shadow(0 0 3px #6085dd)"}
                >
                  4536 4101 1466 2873
                </Text>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Text
                    className={inter.className}
                    letterSpacing={"1.5px"}
                    color={"#fff"}
                    filter={"drop-shadow(0 0 3px #6085dd)"}
                  >
                    04/29
                  </Text>
                  <Text
                    className={inter.className}
                    letterSpacing={"0.1rem"}
                    color={"#fff"}
                    filter={"drop-shadow(0 0 3px #6085dd)"}
                  >
                    567
                  </Text>
                  <FaCcVisa
                    size={"32px"}
                    color={"#fff"}
                    filter={"drop-shadow(0 0 8px #6085dd80)"}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter p="8px 24px 32px">
          <Stack width="100%" gap="8px" direction="row">
            <Button width="100%" colorScheme="brand" onClick={onClose}>
              OK
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default memo(CardInfoModal);
