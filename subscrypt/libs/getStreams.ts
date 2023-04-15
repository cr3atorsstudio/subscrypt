import { Signer } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";

export default async function getStreams(
  signer: Signer,
  sf: Framework
): Promise<boolean> {
  const usdcx = await sf.loadSuperToken("fUSDCx");
  const sender = await signer.getAddress();

  try {
    const flow = await usdcx.getFlow({
      sender: sender,
      receiver: process.env.NEXT_PUBLIC_RECEIVER_WALLET_ADDRESS || "",
      providerOrSigner: signer,
    });
      console.log(flow, ">>>");
      
      // Return boolean for now, but we will return the flow object later
      return true
  } catch (error) {
    console.error("Error getting stream info:", error);
    return false
  }
}
