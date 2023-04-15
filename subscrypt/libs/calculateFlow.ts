import { BigNumber, ethers } from "ethers";

export default function calculateFlow(months: number, amount: string): number {
  const weiAmount = BigNumber.from(amount).mul(BigNumber.from(10).pow(18));
  const secondsPerPeriod = months * 30 * 24 * 60 * 60;
  const flowRate = weiAmount.div(BigNumber.from(secondsPerPeriod));

  return flowRate.toNumber();
}
