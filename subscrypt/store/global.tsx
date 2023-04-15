import { useEffect } from "react";
import { RecoilRoot, atom, useSetRecoilState } from "recoil";
import { useAccount } from "wagmi";
import axios from "axios";

type Props = {
  children: React.ReactElement | null;
};

export const globalStore = {
  userAddress: atom<string | undefined>({
    key: "global/userAddress",
    default: undefined,
  }),
  isConnected: atom<boolean>({
    key: "global/isConnected",
    default: false,
  }),
  isWalletConnectModalOpen: atom<boolean>({
    key: "global/isWalletConnectModalOpen",
    default: false,
  }),
  isConfirmModalOpen: atom<boolean>({
    key: "global/isConfirmModalOpen",
    default: false,
  }),
  isCardInfoModalOpen: atom<boolean>({
    key: "global/isCardInfoModalOpen",
    default: false,
  }),
  isProgress: atom<boolean>({
    key: "global/isProgress",
    default: false,
  }),
  ethPriceByUsd: atom<number>({
    key: "global/ethPriceByUsd",
    default: 0,
  }),
  isEth: atom<boolean>({
    key: "global/isEth",
    default: false,
  }),
  isVerifyModalOpen: atom<boolean>({
    key: "global/isVerifyModalOpen",
    default: false,
  }),
  proof: atom<string>({ key: "global/proof", default: "" }),
};

const GlobalValuesWrapper = ({ children }: Props) => {
  const { address, isConnected } = useAccount();

  const setUserAddress = useSetRecoilState(globalStore.userAddress);
  const setIsConnected = useSetRecoilState(globalStore.isConnected);
  const setEthPriceByUsd = useSetRecoilState(globalStore.ethPriceByUsd);

  const setIsEth = useSetRecoilState(globalStore.isEth);

  useEffect(() => {
    setIsEth(Number(process.env.NEXT_PUBLIC_CHAIN_ID) === 1);
    setUserAddress(address);
    setIsConnected(isConnected);
  }, [address, isConnected, setIsConnected, setIsEth, setUserAddress]);

  useEffect(() => {
    // TODO: あとでNumber(process.env.NEXT_PUBLIC_CHAIN_ID) === 1かどうかでリクエストを投げるか判断するようにする
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
        );
        setEthPriceByUsd(response.data.USD);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return children;
};

export const GlobalStoreRoot = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <GlobalValuesWrapper>{children}</GlobalValuesWrapper>
    </RecoilRoot>
  );
};
