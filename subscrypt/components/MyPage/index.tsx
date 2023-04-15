import { globalStore } from "@/store/global";
import { Box, Button, Image, Text, useToast } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { FC, memo, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AppMenu from "../Common/AppMenu";
import ConnectWalletButton from "../Common/ConnectWalletButton";
import ConnectWalletModal from "../Common/ConnectWalletModal";
import { useProvider, useSigner } from "wagmi";
import { Framework } from "@superfluid-finance/sdk-core";
import getStreams from "@/libs/getStreams";
import { FaCcVisa } from "react-icons/fa";
import cancelStream from "@/libs/cancelStream";

const inter = Inter({ subsets: ["latin"] });
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

const MyPage: FC = () => {
  const [hasStream, setHasStream] = useState(false);
  const setIsProgress = useSetRecoilState(globalStore.isProgress);
  const isConnected = useRecoilValue(globalStore.isConnected);

  const toast = useToast();
  const router = useRouter();
  const provider = useProvider();
  const { data: signer } = useSigner();

  useEffect(() => {
    if (!isConnected || !signer || !provider) return;

    const getData = async () => {
      const sf = await Framework.create({
        chainId: CHAIN_ID,
        provider: provider,
      });
      const superSigner = sf.createSigner({ signer: signer });

      const response = await getStreams(superSigner, sf);
      console.log(response);
      if (response) {
        setHasStream(true);
      } else {
        toast({
          title: "Failed.",
          description: "Could not fetch data, please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };

    getData();
  }, [isConnected, provider, signer, router.asPath, toast]);

  const onCancel = async () => {
    console.log("cancel");
    if (!isConnected || !signer || !provider) return;
    setIsProgress(true);
    const sf = await Framework.create({
      chainId: CHAIN_ID,
      provider: provider,
    });
    const superSigner = sf.createSigner({ signer: signer });

    const response = await cancelStream(superSigner, sf);
    console.log(response);
    if (response) {
      setHasStream(false);
      toast({
        title: "Success",
        description: "Cancel was successful!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed.",
        description: "Could not Cancel, please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setIsProgress(false);
  };

  return (
    <main>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display={["block", "flex"]}
        justifyContent="center"
        alignItems="center"
        color="#1E1E1E"
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap="32px"
          backgroundColor="#fff"
          padding={["60px 16px 32px", "32px"]}
          borderRadius={6}
        >
          <h1>
            <Image src="/logo.png" alt="SubsCrypt" width={"185px"} />
          </h1>
          <Box
            minWidth="340px"
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap="24px"
          >
            <Text className={inter.className}>Your SubsCrypts</Text>
            {!isConnected && (
              <Box
                border="1px solid #D2D5FB"
                width="100%"
                style={{ aspectRatio: "4/2" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="8px"
              >
                <Box width="160px">
                  <ConnectWalletButton />
                </Box>
              </Box>
            )}
            {isConnected && hasStream && (
              <Box>
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
                <Button
                  width="100%"
                  colorScheme={"red"}
                  mt="16px"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Box>
            )}
            {isConnected && !hasStream && (
              <Box
                border="1px solid #D2D5FB"
                width="100%"
                style={{ aspectRatio: "4/2" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="8px"
              >
                <Text
                  className={inter.className}
                  fontSize="14px"
                  color="#B2B7FE"
                >
                  No Data
                </Text>
              </Box>
            )}
            <Button
              width="100%"
              colorScheme={"brand"}
              variant="outline"
              onClick={() => router.push("/")}
            >
              Back to TOP
            </Button>
          </Box>
        </Box>
        <AppMenu />
        <ConnectWalletModal />
      </Box>
    </main>
  );
};

export default memo(MyPage);
