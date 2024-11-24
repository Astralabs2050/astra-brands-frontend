// app/api/get-escrow-balance/route.ts
import { executeCommand, handleError } from "../utils/soroban";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");

    if (!from) {
      return NextResponse.json(
        { error: "Missing from parameter" },
        { status: 400 }
      );
    }

    const command = `soroban contract invoke --id CD35JHEO6NWGGYTPPGG3VYKNALW42LOGGC7CRBD4L2URI7YZLIS32B2S \
      --rpc-url https://soroban-testnet.stellar.org \
      --network-passphrase "Test SDF Network ; September 2015" \
      --source-account ${process.env.STELLAR_SECRET_KEY} \
      -- get_escrow_balance --shopper ${from}`;

    const response = await executeCommand(command);
    // Parse the response to a number
    const balance = parseInt(response.trim().replace(/['"]+/g, ""), 10);

    return NextResponse.json({
      balance: isNaN(balance) ? 0 : balance,
    });
  } catch (error: unknown) {
    return handleError(error);
  }
}
