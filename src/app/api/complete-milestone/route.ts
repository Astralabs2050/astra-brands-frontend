import { executeCommand, handleError } from "../utils/soroban";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { from } = await request.json();

    const command = `soroban contract invoke --id CD35JHEO6NWGGYTPPGG3VYKNALW42LOGGC7CRBD4L2URI7YZLIS32B2S \
      --rpc-url https://soroban-testnet.stellar.org \
      --network-passphrase "Test SDF Network ; September 2015" \
      --source-account SC5AFJ4FF3S7HGR2PA7XF3YZLNSOEJMKS46SAK7XTAZZ42OWKTAVTXFQ \
      --send=yes \
      -- complete_milestone --shopper ${from}`;

    const response = await executeCommand(command);
    console.log("Complete Milestone Response:", response);
    const statusMessage = response.trim();
    return NextResponse.json({ status: statusMessage });
  } catch (error) {
    return handleError(error);
  }
}
