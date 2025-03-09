import { SuiObjectChange } from "@mysten/sui.js/client";
import { SuiClient } from "@mysten/sui/client";

import { Transaction } from "@mysten/sui/transactions";

// Constants
const PACKAGE_ID =
  "0xf4ce55ec4e19767b2b36f6928d687f9c781c2621453cb2714f9dfc4603bc64ac";
const USDC_TYPE =
  "0xa1ec7fc00a6f40db9693ad1415d0c193ad3906494428cf252621037bd7117e29::usdc::USDC";

export interface EscrowParams {
  amount: string;
  maker: string;
  treasury: string;
  shopper: string;
  currentAccount: { address: string } | null;
}

export interface TransactionResult {
  objectChanges?: SuiObjectChange[];
  [key: string]: unknown;
}

export interface EscrowObjectContent {
  data?: {
    content: {
      fields: {
        usdc: string;
      };
    };
  };
}

export const createEscrowTransaction = async (
  client: SuiClient,
  params: EscrowParams
): Promise<Transaction> => {
  const { amount, maker, treasury, shopper, currentAccount } = params;

  if (!currentAccount) {
    throw new Error("No wallet connected");
  }

  if (!maker || !treasury || !shopper) {
    throw new Error("Please fill in all required address fields");
  }

  const totalAmount = Number(amount);
  if (isNaN(totalAmount) || totalAmount <= 0) {
    throw new Error("Please enter a valid amount greater than 0");
  }

  const userCoins = await client.getCoins({
    owner: currentAccount.address,
    coinType: USDC_TYPE,
  });

  if (!userCoins?.data || userCoins.data.length === 0) {
    throw new Error("No USDC coins found in wallet");
  }

  const selectedCoins = [];
  let selectedAmount = 0;

  for (const coin of userCoins.data) {
    selectedCoins.push(coin);
    selectedAmount += Number(coin.balance);

    if (selectedAmount >= totalAmount) {
      break;
    }
  }

  if (selectedAmount < totalAmount) {
    throw new Error(
      `Insufficient USDC balance. Need ${totalAmount}, have ${selectedAmount}`
    );
  }

  const coinBalance = Number(selectedCoins[0].balance);
  if (totalAmount > coinBalance) {
    throw new Error(
      `Amount (${totalAmount}) exceeds single coin balance (${coinBalance})`
    );
  }

  const tx = new Transaction();
  const coinId = selectedCoins[0].coinObjectId;

  tx.moveCall({
    target: `${PACKAGE_ID}::escrow::create_escrow`,
    typeArguments: [USDC_TYPE],
    arguments: [
      tx.splitCoins(tx.object(coinId), [totalAmount]),
      tx.pure.address(maker),
      tx.pure.address(treasury),
      tx.pure.vector("address", []),
      tx.pure.address(shopper),
      tx.pure.u64(totalAmount),
    ],
  });

  return tx;
};

export const createCompleteMilestoneTransaction = (
  escrowId: string
): Transaction => {
  if (!escrowId) {
    throw new Error("No escrow ID available");
  }

  const tx = new Transaction();
  tx.moveCall({
    target: `${PACKAGE_ID}::escrow::complete_milestone`,
    typeArguments: [USDC_TYPE],
    arguments: [tx.object(escrowId)],
  });

  return tx;
};

export const getEscrowBalance = async (
  client: SuiClient,
  escrowId: string
): Promise<string> => {
  if (!escrowId) {
    throw new Error("No escrow ID available");
  }

  const objectState = await client.getObject({
    id: escrowId,
    options: { showContent: true },
  });

  const content = objectState as EscrowObjectContent;
  const balance = content?.data?.content?.fields?.usdc;

  if (balance === undefined) {
    throw new Error("Could not locate balance field in escrow object");
  }

  return balance;
};
