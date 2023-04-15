// @ts-nocheck
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { SafeOnRampKit, SafeOnRampProviderType } from "@safe-global/onramp-kit";
import { FC, memo, useState } from "react";
import AppMenu from "../Common/AppMenu";

const inter = Inter({ subsets: ["latin"] });

const Stripe: FC = () => {
  const [address, setAddress] = useState("");

  console.log(address);
  const fundWallet = async () => {
    const safeOnRamp = await SafeOnRampKit.init(SafeOnRampProviderType.Stripe, {
      onRampProviderConfig: {
        // Get public key from Stripe: https://dashboard.stripe.com/register
        stripePublicKey:
          "pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO",
        // Deploy your own server: https://github.com/safe-global/account-abstraction-sdk/tree/main/packages/onramp-kit/example/server
        onRampBackendUrl: "https://aa-stripe.safe.global",
      },
    });

    const sessionData = await safeOnRamp.open({
      walletAddress: address,
      networks: ["polygon", "ethereum"],
      element: "#stripe-root",
      // Optional, if you want to use a specific created session
      sessionId: "cos_1Mei3cKSn9ArdBimJhkCt1XC",
      events: {
        onLoaded: () => console.log("Loaded"),
        onPaymentSuccessful: () => console.log("Payment successful"),
        onPaymentError: () => console.log("Payment failed"),
        onPaymentProcessing: () => console.log("Payment processing"),
      },
    });

    console.log({ sessionData });
  };

  return (
    <main id="stripe-root">
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
            <Text className={inter.className}>Buy Cryptocurrency</Text>
            <FormControl>
              <FormLabel className={inter.className}>
                Destination Address
              </FormLabel>
              <Input
                placeholder="0x0..."
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </FormControl>
            <Button
              colorScheme="brand"
              width="100%"
              isDisabled={address == ""}
              onClick={fundWallet}
            >
              Fund Wallet
            </Button>
          </Box>
        </Box>
      </Box>
      <AppMenu />
    </main>
  );
};

export default memo(Stripe);
