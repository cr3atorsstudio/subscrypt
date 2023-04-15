import { Signer } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import sendNotification from "./sendNotification";

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

export default async function cancelStream(
  receiver: string,
  signer: Signer,
  sf: Framework
): Promise<boolean> {
  const usdcx = await sf.loadSuperToken(CHAIN_ID === 5 ? "ETHx" : "fUSDCx");
  const sender = await signer.getAddress();

  try {
    const deleteFlowOperation = usdcx.deleteFlow({
      sender: sender,
      receiver: receiver,
    });

    console.log("Cancelling your stream...");

    const tx = await deleteFlowOperation.exec(signer);

    await tx.wait();

    console.log(
      `Your stream has been successfully cancelled!
    `
    );
    sendNotification(sender, {
      title: "Subscription has been cancelled",
      body: "You have successfully cancelled your subscription.",
    });

    return true;
  } catch (error) {
    console.log("Hmmm, your transaction threw an error");
    console.error(error);
    return false;
  }
}
