import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { ReactNode } from "react";

import { polygonMumbai, polygon, goerli } from "@wagmi/chains";

type Props = {
  children: ReactNode;
};

const chainId = () => {
  switch (process.env.NEXT_PUBLIC_CHAIN_ID) {
    case "5":
      return goerli;
    case "137":
      return polygon;
    default:
      return polygonMumbai;
  }
};

const { chains, provider, webSocketProvider } = configureChains(
  [chainId()],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API! }),
    publicProvider(),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
        showQrModal: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

export const WagmiProvider = ({ children }: Props) => (
  <WagmiConfig client={client}>{children}</WagmiConfig>
);
