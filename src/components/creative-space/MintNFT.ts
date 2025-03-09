import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useState } from "react";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";

export function useMintNFT() {
  const client = useSuiClient();
  const [createdObjectId, setCreatedObjectId] = useState<string | null>(null);
  const [digest, setDigest] = useState<string>("");

  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({
      bytes,
      signature,
    }: {
      bytes: string;
      signature: string;
    }) =>
      await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showObjectChanges: true,
        },
      }),
  });

  const mintNFT = async (designData: {
    designId: string;
    designName: string;
    fabricType: string;
    designImage: string;
    prompt: string;
  }) => {
    try {
      const tx = new Transaction();

      tx.moveCall({
        target:
          "0x6a18f9507db74f41447996aac7289f25e268d3fb832f8c8bb36e6dac6445a9a8::NftModule::mint_to_sender",
        arguments: [
          tx.pure.string(designData.designId),
          tx.pure.string(designData.designName),
          tx.pure.string(designData.fabricType),
          tx.pure.string(designData.designImage),
          tx.pure.string(designData.prompt),
        ],
      });

      signAndExecuteTransaction(
        { transaction: tx, chain: "sui:testnet" },
        {
          onSuccess: (result: SuiTransactionBlockResponse) => {
            setDigest(result.digest || "");
            const createdObject = result.objectChanges?.find(
              (change) => change.type === "created"
            ) as { type: string; objectId: string } | undefined;

            if (createdObject?.objectId) {
              setCreatedObjectId(createdObject.objectId);
            }

            return { objectId: createdObject?.objectId, digest: result.digest };
          },
          onError: (error: unknown) => {
            console.error("Transaction failed:", error);
            throw error;
          },
        }
      );
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  };

  return {
    mintNFT,
    createdObjectId,
    digest,
  };
}
