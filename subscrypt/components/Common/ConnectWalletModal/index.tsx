import { globalStore } from "@/store/global";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useConnect } from "wagmi";

const ConnectWalletModal: FC = () => {
  const [isWalletConnectModalOpen, setIsWalletConnectModalOpen] =
    useRecoilState(globalStore.isWalletConnectModalOpen);

  const [isNotMetamask, setIsNotMetamask] = useState(false);
  const { connect, connectors, isLoading, pendingConnector } = useConnect();

  const isMobile = useMediaQuery(`(max-width: 375px)`)[0];

  useEffect(() => {
    setIsNotMetamask(!window?.ethereum?.isMetaMask);
  }, []);

  const onClose = () => {
    setIsWalletConnectModalOpen(false);
  };

  return (
    <>
      <Modal
        isCentered
        isOpen={isWalletConnectModalOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size={"xs"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box pt="16px" pb="8px">
              {connectors.map((connector) => (
                <Button
                  width="100%"
                  variant="outline"
                  mb={"8px"}
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => {
                    connect({ connector });
                    onClose();
                  }}
                >
                  {connector.name}
                  {/* {!connector.ready && " (unsupported)"} */}
                  {isLoading &&
                    connector.id === pendingConnector?.id &&
                    " (connecting)"}
                </Button>
              ))}
              {isMobile && isNotMetamask && (
                <Box>
                  <p style={{ textAlign: "center", marginBottom: 16 }}>or</p>
                  <Button
                    width="100%"
                    onClick={() => {
                      window.open(
                        `https://metamask.app.link/dapp/${window.location.host}/#/`
                      );
                    }}
                  >
                    Use MetaMask App
                  </Button>
                </Box>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(ConnectWalletModal);
