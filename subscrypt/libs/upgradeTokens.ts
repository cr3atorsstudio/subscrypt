import { Framework } from "@superfluid-finance/sdk-core";
import { Signer, ethers } from "ethers";

export default async function upgradeTokens(
  amount: number,
  signer: Signer,
  sf: Framework
): Promise<boolean> {
  const usdcx = await sf.loadSuperToken("fUSDCx");

  console.log("amount", Math.ceil(amount));

  try {
    // @ts-ignore
    const upgradeOperation = usdcx.upgrade({
      amount: ethers.utils.parseEther(Math.ceil(amount).toString()),
    });

    console.log("Upgrading...");

    const tx = await upgradeOperation.exec(signer);

    await tx.wait();

    console.log(
      `Congrats - you've just upgraded your tokens to an Index!
         Network: Mumbai
         Super Token: USDCx
         Amount: ${amount}         
      `
    );

    return true;
  } catch (error) {
    console.log(
      "Something went wrong while upgrading your tokens. Please try again."
    );
    console.error(error);
    return false;
  }
}
