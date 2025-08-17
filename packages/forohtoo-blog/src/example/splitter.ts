import { ethers, Interface, JsonRpcProvider, TransactionRequest, Wallet } from "ethers";
import env from "../env";

async function test() {
    if (env.TEST === "true") return

    console.log("Starting test...");

    const provider = new JsonRpcProvider("https://sepolia.base.org");
    const signer = new Wallet(env.SENDER_PRIVATE_KEY, provider);
    console.log(`Sending transaction from: ${signer.address}`);

    console.log(`Sending transaction to: ${env.RECEIVER_ADDRESS}`);

    const contractABI = ["function split(uint256 amount, address recipient)"];
    const iface = new Interface(contractABI);
    const dataPayload = iface.encodeFunctionData("split", [10n, "0x5A297a57c4f2Eae22D40d3A8B8ca453fd084e56e"]);

    try {
        const tx: TransactionRequest = {
            to: env.RECEIVER_ADDRESS,
            value: ethers.parseEther("0.0"),
            data: dataPayload
        };
        const txResponse = await signer.sendTransaction(tx);
        console.log('Transaction sent! Hash:', txResponse.hash);
    } catch (e) {
        console.error('Error sending transaction:', e);
    }
}

await test()
