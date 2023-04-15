import { globalStore } from "@/store/global";
import { Button } from "@chakra-ui/react";
import { CredentialType, ISuccessResult } from "@worldcoin/idkit";
import dynamic from "next/dynamic";
import { FC, memo } from "react";
import { useSetRecoilState } from "recoil";

interface VerifyButtonProps {
  isMenu?: boolean;
}

const VerifyButton: FC<VerifyButtonProps> = (props) => {
  const { isMenu } = props;
  const setProof = useSetRecoilState(globalStore.proof);
  const IDKitWidget = dynamic(
    () => import("@worldcoin/idkit").then((mod) => mod.IDKitWidget),
    { ssr: false }
  );

  const onSuccess = (result: ISuccessResult) => {
    setProof(result.proof);
  };
  return (
    <>
      <IDKitWidget
        app_id={process.env.NEXT_PUBLIC_WORLD_ID_APP_ID ?? ""}
        action="verify"
        onSuccess={onSuccess}
        walletConnectProjectId={
          process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
        }
        credential_types={[CredentialType.Phone]}
      >
        {({ open }) => (
          <Button
            size={isMenu ? "xs" : "lg"}
            borderRadius={isMenu ? "3px" : undefined}
            maxWidth={isMenu ? "140px" : undefined}
            width={"100%"}
            colorScheme="brand"
            onClick={open}
          >
            Verify with Worldcoin
          </Button>
        )}
      </IDKitWidget>
    </>
  );
};

export default memo(VerifyButton);
