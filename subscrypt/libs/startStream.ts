import calculateFlow from "./calculateFlow";
import { BigNumberish, Signer, ethers, utils } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import {
  ETHER_GOERLI,
  ETHER_SUPER_GOERLI,
  FAKE_USDC_MUMBAI,
  FAKE_USDC_SUPER_MUMBAI,
} from "@/constants/contractAddresses";
import approveTokens from "./approveTokens";
import upgradeTokens from "./upgradeTokens";
import fUSDCABI from "@/abi/fUSDC_ABI.json";
import GOERLI_ETH_ABI from "@/abi/GOERLI_ETH_ABI.json";
import { SUBSCRIPTION_OPTIONS } from "@/constants/subscriptions";
import sendNotification from "./sendNotification";

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

export default async function startStream(
  selectedSubscriptionId: number,
  selectedPlanId: number,
  months: number,
  amount: number,
  signer: Signer,
  sf: Framework,
  fUSDCx: string
): Promise<boolean> {
  const fusdc = new ethers.Contract(
    CHAIN_ID === 5 ? ETHER_GOERLI : FAKE_USDC_MUMBAI,
    CHAIN_ID === 5 ? fUSDCABI : GOERLI_ETH_ABI,
    signer
  );
  const usdcx = await sf.loadSuperToken(CHAIN_ID === 5 ? "ETHx" : "fUSDCx");
  const sender = await signer.getAddress();

  // TOOD: Use months and amount from UI input
  // const flowRatePerSec = calculateFlow(months, amount.toString());
  const flowRatePerSec = calculateFlow(1, "1");
  console.log(flowRatePerSec, "flowRatePerSec");

  try {
    const totalAmountInfUSDC = amount * months;
    const allowance: BigNumberish = await fusdc.allowance(
      sender,
      CHAIN_ID === 5 ? ETHER_SUPER_GOERLI : FAKE_USDC_SUPER_MUMBAI
    );

    const convertedAllowanceInfUSDC = ethers.utils.formatUnits(
      allowance.toString(),
      18
    );

    console.log(totalAmountInfUSDC, "totalAmountInfUSDC");
    console.log(convertedAllowanceInfUSDC, "convertedAllowanceInfUSDC");

    // Check if the user has approved the fUSDCx contract to spend their fUSDC
    if (
      totalAmountInfUSDC > Number(convertedAllowanceInfUSDC) &&
      CHAIN_ID !== 5
    ) {
      const hasApproved = await approveTokens(totalAmountInfUSDC, signer);

      console.log(hasApproved, "hasApproved");

      if (!hasApproved) {
        return false;
      }
    }

    console.log(Number(fUSDCx), totalAmountInfUSDC, "amounts");

    // Check if the user has enough fUSDCx tokens
    if (Number(fUSDCx) < totalAmountInfUSDC) {
      const difference = totalAmountInfUSDC - Number(fUSDCx);
      console.log(difference, "difference");
      const hasUpgraded = await upgradeTokens(difference, signer, sf);

      if (!hasUpgraded) {
        return false;
      }
    }

    // Encode the data for the stream
    const userData = utils.defaultAbiCoder.encode(
      ["uint256", "uint256", "uint256", "string"],
      [selectedSubscriptionId, selectedPlanId, months, amount.toString()] // subscriptionId, planId, months, amount
    );

    // Create the stream
    const createFlowOperation = usdcx.createFlow({
      sender: sender,
      receiver: SUBSCRIPTION_OPTIONS[selectedSubscriptionId].receiver,
      flowRate: flowRatePerSec.toString(),
      userData: userData,
    });

    console.log("Creating your stream...");

    const tx = await createFlowOperation.exec(signer);
    await tx.wait();

    console.log(
      `Congrats - you've just created a money stream!
    `
    );

    sendNotification(sender, {
      title: "Subscription has been started!",
      body: "You have successfully started your subscription.",
    });

    return true;
  } catch (error) {
    console.log("Hmmm, your transaction threw an error");
    console.error(error);
    return false;
  }
}
