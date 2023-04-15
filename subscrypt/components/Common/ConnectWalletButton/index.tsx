import { globalStore } from "@/store/global";
import { Button } from "@chakra-ui/react";
import { FC, memo } from "react";
import { useSetRecoilState } from "recoil";

interface ConnectWalletButtonProps {
  isMenu?: boolean;
}

const ConnectWalletButton: FC<ConnectWalletButtonProps> = (props) => {
  const { isMenu } = props;
  const setIsWalletConnectModalOpen = useSetRecoilState(
    globalStore.isWalletConnectModalOpen
  );

  const onClick = () => {
    console.log("Open Connect Wallet modal");
    setIsWalletConnectModalOpen(true);
  };

  return (
    <>
      <Button
        colorScheme="brand"
        width="100%"
        size={isMenu ? "xs" : "lg"}
        borderRadius={isMenu ? "3px" : undefined}
        onClick={onClick}
      >
        Connect Wallet
      </Button>
    </>
  );
};

export default memo(ConnectWalletButton);
