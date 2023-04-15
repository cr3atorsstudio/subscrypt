import { Signer, utils } from "ethers";
import { Framework, IStream } from "@superfluid-finance/sdk-core";
import {
  SUBSCRIPTION_OPTIONS,
  SUBSCRIPTION_RECEIVERS,
} from "@/constants/subscriptions";

export default async function getStreams(
  signer: Signer,
  sf: Framework
): Promise<null | IStream[]> {
  const usdcx = await sf.loadSuperToken("fUSDCx");
  const sender = await signer.getAddress();

  try {
    const result = await sf.query.listStreams({
      sender: sender,
      token: usdcx.address,
    });
    console.log("result", result.data);
    return result.data
      .filter((element) => {
        return SUBSCRIPTION_RECEIVERS.includes(element.receiver.toLowerCase());
      })
      .filter((element) => element.currentFlowRate !== "0");
  } catch (error) {
    console.error("Error getting stream info:", error);
    return null;
  }
}
