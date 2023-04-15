import { globalStore } from "@/store/global";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
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
import Davatar from "@davatar/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const AppMenu: FC = () => {
  const [showSwap, setShowSwap] = useState(false);

  const router = useRouter();
  const proof = useRecoilValue(globalStore.proof);
  const userAddress = useRecoilValue(globalStore.userAddress);

  const { disconnect } = useDisconnect();

  const openSwap = useCallback(() => {
    setShowSwap(!showSwap);
  }, [showSwap]);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position="fixed"
      top={["8px", "30px"]}
      right={["8px", "30px"]}
      gap={"8px"}
    >
      {proof !== "" && userAddress !== undefined && (
        <Box
          display="inline-flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          gap="8px"
        >
          {userAddress !== undefined && (
            <Davatar address={userAddress} size={15} />
          )}
          <Text
            className={inter.className}
            fontSize={"14px"}
            fontWeight={"bold"}
          >
            {`${userAddress?.slice(0, 3)}...${userAddress?.slice(-4)}`}
          </Text>
        </Box>
      )}
      {proof !== "" && userAddress === undefined && (
        <ConnectWalletButton isMenu />
      )}
      {/* <div className="Uniswap">
        <SwapWidget />
      </div> */}
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          size="sm"
          borderRadius="3px"
          backgroundColor="#fff"
          color="#1E1E1E"
          border="1px solid #dcdcdc"
          _hover={{
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
          _active={{
            backgroundColor: "#fff",
          }}
        ></MenuButton>
        <MenuList>
          <MenuGroup>
            <MenuItem onClick={() => router.push("/")}>Register</MenuItem>
            <MenuItem onClick={() => router.push("/my-page")}>My Page</MenuItem>
            <MenuItem onClick={() => router.push("/stripe")}>
              Buy Cryptocurrency
            </MenuItem>
            <MenuItem isDisabled onClick={openSwap}>
              Swap - coming soon
            </MenuItem>
          </MenuGroup>
          {userAddress !== undefined && (
            <>
              <MenuDivider />
              <MenuGroup>
                <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
              </MenuGroup>
            </>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default memo(AppMenu);
