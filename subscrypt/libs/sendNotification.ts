import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";
import CHANNEL_PRIVATE_KEY from "@/constants/pushProtocol";

export default async function sendNotification(
  recipientAddress: string,
  messsage: {
    title: string;
    body: string;
  }
) {
  try {
    const PK = CHANNEL_PRIVATE_KEY; // channel private key
    const Pkey = `0x${PK}`;
    const _signer = new ethers.Wallet(Pkey);

    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: "Subscrypt",
        body: "You have a new message",
      },
      payload: {
        title: messsage.title,
        body: messsage.body,
        cta: "",
        img: "",
      },
      recipients: "eip155:5:" + recipientAddress, // recipient address
      channel: "eip155:5:0x710c8Fa06E9Ba9E2E4c75e30ac3e6fbD8A988550", // channel address
      // @ts-ignore
      env: "staging",
    });
  } catch (err) {
    console.error("Error: ", err);
  }
}
