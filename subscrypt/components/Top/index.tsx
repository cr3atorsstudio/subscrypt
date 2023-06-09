import { globalStore } from "@/store/global";
import {
  Box,
  Image,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { memo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  useAccount,
  useBalance,
  useNetwork,
  useProvider,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import AppMenu from "../Common/AppMenu";
import ConfirmModal from "../Common/ConfirmModal";
import ConnectWalletButton from "../Common/ConnectWalletButton";
import ConnectWalletModal from "../Common/ConnectWalletModal";
import SubsCryptCard from "../Common/SubsCryptCard";
import startStream from "@/libs/startStream";
import { Framework } from "@superfluid-finance/sdk-core";
import {
  FAKE_USDC_SUPER_MUMBAI,
  FAKE_USDC_MUMBAI,
  ETHER_SUPER_GOERLI,
  ETHER_GOERLI,
} from "@/constants/contractAddresses";
import { SUBSCRIPTION_OPTIONS } from "@/constants/subscriptions";
import CardInfoModal from "../Common/CardInfoModal";
import VerifyButton from "../Common/VerifyButton";

const inter = Inter({ subsets: ["latin"] });
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

const Top = () => {
  const isConnected = useRecoilValue(globalStore.isConnected);
  const isEth = useRecoilValue(globalStore.isEth);
  const proof = useRecoilValue(globalStore.proof);

  const setIsConfirmModalOpen = useSetRecoilState(
    globalStore.isConfirmModalOpen
  );
  const setIsCardInfoModalOpen = useSetRecoilState(
    globalStore.isCardInfoModalOpen
  );
  const setIsProgress = useSetRecoilState(globalStore.isProgress);

  const [month, setMonth] = useState("1");
  const [selectedSubscription, setSelectedSubscription] = useState(0);
  const [plan, setPlan] = useState(1);

  const toast = useToast();

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { data: superTokenBalance } = useBalance({
    address: address,
    token: CHAIN_ID === 5 ? ETHER_SUPER_GOERLI : FAKE_USDC_SUPER_MUMBAI,
    watch: true,
  });
  const { data: tokenBalance } = useBalance({
    address: address,
    token: CHAIN_ID === 5 ? ETHER_GOERLI : FAKE_USDC_MUMBAI,
    watch: true,
  });

  const selectedSubscriptionName =
    selectedSubscription === 0
      ? ""
      : SUBSCRIPTION_OPTIONS[
          SUBSCRIPTION_OPTIONS.findIndex(
            (option) => option.id === selectedSubscription
          )
        ].name;
  const selectedSubscriptionHasPlan =
    selectedSubscription === 0
      ? []
      : SUBSCRIPTION_OPTIONS[
          SUBSCRIPTION_OPTIONS.findIndex(
            (option) => option.id === selectedSubscription
          )
        ].plan;
  const selectedSubscriptionPlanCost =
    selectedSubscription === 0
      ? 0
      : selectedSubscriptionHasPlan[
          selectedSubscriptionHasPlan.findIndex((option) => option.id === plan)
        ].cost;
  const selectedSubscriptionPlanCostInCrypto = selectedSubscriptionPlanCost;

  const handlePayButtonClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmButtonClick = async () => {
    setIsConfirmModalOpen(false);
    setIsProgress(true);
    if (chain?.id !== CHAIN_ID) {
      switchNetwork?.(CHAIN_ID!);
    }

    const sf = await Framework.create({
      chainId: CHAIN_ID,
      provider: provider,
    });

    if (signer) {
      const superSigner = sf.createSigner({ signer: signer });

      const response = await startStream(
        Number(selectedSubscription),
        Number(plan),
        Number(month),
        selectedSubscriptionPlanCostInCrypto,
        superSigner,
        sf,
        superTokenBalance?.formatted || "0"
      );

      if (response) {
        toast({
          title: "Success",
          description: "Registration was successful!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsProgress(false);
        setIsCardInfoModalOpen(true);
        setSelectedSubscription(0);
        setMonth("6");
        setPlan(1);
      } else {
        setIsProgress(false);
        toast({
          title: "Failed.",
          description: "Could not register, please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
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
            width={"100%"}
            maxW={"480px"}
            minWidth="340px"
            display="flex"
            gap="24px"
            flexDirection="column"
          >
            <FormControl>
              <FormLabel className={inter.className}>
                Select Subscription
              </FormLabel>
              <Select
                placeholder="Select"
                value={selectedSubscription}
                onChange={(e) => {
                  setPlan(1);
                  setSelectedSubscription(Number(e.target.value));
                }}
              >
                {SUBSCRIPTION_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {selectedSubscription !== 0 && (
              <FormControl>
                <FormLabel className={inter.className}>Select Plan</FormLabel>
                <Select
                  value={plan}
                  onChange={(e) => setPlan(Number(e.target.value))}
                >
                  {selectedSubscriptionHasPlan.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl>
              <FormLabel className={inter.className}>
                Choose a period of time for a lump-sum payment.
              </FormLabel>
              <RadioGroup onChange={setMonth} value={month}>
                <Stack direction="row">
                  <Radio value="1">1 month</Radio>
                  <Radio value="6">6 months</Radio>
                  <Radio value="12">12 months</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Box>
          <Box width={"100%"} maxW={"480px"} margin={"0 auto"}>
            <Box mb="16px">
              {selectedSubscription !== 0 && (
                <SubsCryptCard
                  selectedSubscriptionName={selectedSubscriptionName}
                  selectedSubscriptionPlanCost={selectedSubscriptionPlanCost}
                  month={month}
                  selectedSubscriptionPlanCostInCrypto={
                    selectedSubscriptionPlanCostInCrypto
                  }
                  showCancelButton={false}
                />
              )}
            </Box>
            {isConnected && proof !== "" && (
              <Button
                colorScheme="brand"
                width="100%"
                isDisabled={selectedSubscription === 0}
                onClick={handlePayButtonClick}
              >
                {`Pay for ${isEth ? "ETH" : "USDC"}`}
              </Button>
            )}
            {!isConnected && proof !== "" && <ConnectWalletButton />}
            {proof === "" && <VerifyButton />}
          </Box>
        </Box>
        <AppMenu />
        <ConnectWalletModal />
        <ConfirmModal
          message={"Do you really want to register?"}
          onConfirm={handleConfirmButtonClick}
        />
        <CardInfoModal />
      </Box>
    </main>
  );
};

export default memo(Top);
