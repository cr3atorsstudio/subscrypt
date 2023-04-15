import { globalStore } from "@/store/global";
import { Box, Button, Image, Progress, Text, useToast } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { FC, memo, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AppMenu from "../Common/AppMenu";
import ConnectWalletButton from "../Common/ConnectWalletButton";
import ConnectWalletModal from "../Common/ConnectWalletModal";
import { useProvider, useSigner } from "wagmi";
import { Framework, IStream } from "@superfluid-finance/sdk-core";
import getStreams from "@/libs/getStreams";
import cancelStream from "@/libs/cancelStream";
import SubsCryptCard from "../Common/SubsCryptCard";
import { utils } from "ethers";
import { SUBSCRIPTION_OPTIONS } from "@/constants/subscriptions";
import CardInfoModal from "../Common/CardInfoModal";

const inter = Inter({ subsets: ["latin"] });
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

const MyPage: FC = () => {
  const [streamList, setStreamList] = useState<IStream[]>([]);
  const [loading, setLoading] = useState(false);
  const setIsProgress = useSetRecoilState(globalStore.isProgress);
  const isConnected = useRecoilValue(globalStore.isConnected);

  const toast = useToast();
  const router = useRouter();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const getData = async () => {
    setLoading(true);
    const sf = await Framework.create({
      chainId: CHAIN_ID,
      provider: provider,
    });
    const superSigner = sf.createSigner({ signer: signer });

    const response = await getStreams(superSigner, sf);
    console.log(response);
    if (!!response) {
      setStreamList(response);
      setLoading(false);
    } else {
      setLoading(false);
      toast({
        title: "Failed.",
        description: "Could not fetch data, please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!isConnected || !signer || !provider) return;
    getData();
  }, [isConnected, provider, signer, router.asPath, toast]);

  const onCancel = async (address: string) => {
    console.log("cancel");
    if (!isConnected || !signer || !provider) return;
    setIsProgress(true);
    const sf = await Framework.create({
      chainId: CHAIN_ID,
      provider: provider,
    });
    const superSigner = sf.createSigner({ signer: signer });

    const response = await cancelStream(address, superSigner, sf);
    console.log(response);
    if (response) {
      getData();
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
            {isConnected && (
              <>
                {streamList.length > 0 &&
                  streamList.map((stream, i) => {
                    const decodeData = utils.defaultAbiCoder.decode(
                      ["uint256", "uint256", "uint256", "string"],
                      stream.flowUpdatedEvents[0].userData
                    );
                    console.log(decodeData);
                    const subsc = SUBSCRIPTION_OPTIONS.find(
                      (option) => option.id === Number(decodeData[0])
                    );
                    return (
                      <SubsCryptCard
                        key={i}
                        selectedSubscriptionName={subsc?.name ?? ""}
                        selectedSubscriptionPlanCost={
                          subsc?.plan?.[Number(decodeData[1]) - 1].cost ?? 0
                        }
                        month={Number(decodeData[2]).toString()}
                        selectedSubscriptionPlanCostInCrypto={Number(
                          decodeData[3]
                        )}
                        showCancelButton={true}
                        onCancel={() => {
                          onCancel(stream.receiver);
                        }}
                      />
                    );
                  })}
              </>
            )}
            {isConnected && streamList.length === 0 && (
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
        {loading && (
          <Progress
            position={"fixed"}
            top={0}
            left={0}
            right={0}
            size="sm"
            isIndeterminate
            color="brand"
          />
        )}
        <AppMenu />
        <ConnectWalletModal />
        <CardInfoModal />
      </Box>
    </main>
  );
};

export default memo(MyPage);
