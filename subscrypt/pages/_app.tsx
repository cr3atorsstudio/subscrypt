import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "@/styles/theme";
import { WagmiProvider } from "@/components/Provider/wagmi";
import { GlobalStoreRoot } from "@/store/global";
import Progress from "@/components/Common/Progress";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStoreRoot>
        <WagmiProvider>
          <Progress />
          <Component {...pageProps} />
        </WagmiProvider>
      </GlobalStoreRoot>
    </ChakraProvider>
  );
}
