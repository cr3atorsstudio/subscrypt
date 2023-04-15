import { BigNumber, ethers } from "ethers";

export default function calculateFlow(months: number, amount: number): number {
  const convertedAmount = ethers.utils.parseEther(amount.toString());

  const weiAmount = BigNumber.from(convertedAmount);
  const secondsPerPeriod = months * 30 * 24 * 60 * 60;
  const flowRate = weiAmount.div(BigNumber.from(secondsPerPeriod));

  return flowRate.toNumber();
}
