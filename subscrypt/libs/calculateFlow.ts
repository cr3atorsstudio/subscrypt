import { ethers } from "ethers";

export default function calculateFlow(months: number, amount: string): number {
  if (months === 0) {
    return 0;
  }
  const amountInWei = ethers.BigNumber.from(amount);

  const calculatedFlowRate = (amountInWei.toNumber() * 3600 * 24 * 30) / months;

  return calculatedFlowRate;
}
