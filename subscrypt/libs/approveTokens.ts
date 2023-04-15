import { Signer, ethers } from "ethers";
import abi from "@/abi/fUSDC_ABI.json";
import {
  ETHER_GOERLI,
  ETHER_SUPER_GOERLI,
  FAKE_USDC_MUMBAI,
  FAKE_USDC_SUPER_MUMBAI,
} from "@/constants/contractAddresses";

const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

export default async function approveTokens(
  amount: number,
  signer: Signer
): Promise<boolean> {
  const token = new ethers.Contract(
    CHAIN_ID === 5 ? ETHER_GOERLI : FAKE_USDC_MUMBAI,
    abi,
    signer
  );

  try {
    console.log("approving token spend");
    const tx = await token.approve(
      CHAIN_ID === 5 ? ETHER_SUPER_GOERLI : FAKE_USDC_SUPER_MUMBAI,
      ethers.utils.parseEther(amount.toString())
    );
    await tx.wait();
    console.log("token spend approved");
    return true;
  } catch (error) {
    console.log(
      "Something went wrong while approving your token spend. Please try again."
    );
    console.error(error);
    return false;
  }
}
