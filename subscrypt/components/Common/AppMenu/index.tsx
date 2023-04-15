import { globalStore } from "@/store/global";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, memo, useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { useDisconnect } from "wagmi";
import ConnectWalletButton from "../ConnectWalletButton";
// import { SwapWidget } from "@uniswap/widgets";
// import "@uniswap/widgets/fonts.css";
import Davatar, { Image } from "@davatar/react";

const AppMenu: FC = () => {
  const [showSwap, setShowSwap] = useState(false);

  const router = useRouter();
  const isConnected = useRecoilValue(globalStore.isConnected);
  const userAddress = useRecoilValue(globalStore.userAddress);

  const { disconnect } = useDisconnect();

  return isConnected ? (
    <Box position="fixed" top={["8px", "30px"]} right={["8px", "30px"]}>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          size="xs"
          borderRadius="3px"
          backgroundColor="#fff"
          color="#1E1E1E"
          border="1px solid #dcdcdc"
          paddingTop="2px"
          _hover={{
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
          _active={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            display="inline-flex"
            justifyContent={"space-between"}
            alignItems={"center"}
            gap="8px"
          >
            {userAddress !== undefined && (
              <Davatar address={userAddress} size={15} />
            )}
            {`${userAddress?.slice(0, 3)}...${userAddress?.slice(-4)}`}
          </Box>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => router.push("/")}>Register</MenuItem>
          <MenuItem onClick={() => router.push("/my-page")}>My Page</MenuItem>
          <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
          <MenuItem disabled>Swap(Coming soon)</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  ) : (
    <Box position="fixed" top={["16px", "30px"]} right={["16px", "30px"]}>
      <ConnectWalletButton isMenu />
      {/* <div className="Uniswap">
        <SwapWidget />
      </div> */}
    </Box>
  );
};

export default memo(AppMenu);
