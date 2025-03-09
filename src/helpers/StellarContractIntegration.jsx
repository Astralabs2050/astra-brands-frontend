import {
  TransactionBuilder,
  Networks,
  Contract,
  Address,
  XdrLargeInt,
  nativeToScVal,
  rpc,
  scValToNative,
} from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";

const CONTRACT_ID = "CD35JHEO6NWGGYTPPGG3VYKNALW42LOGGC7CRBD4L2URI7YZLIS32B2S";
const RPC_URL = "https://soroban-testnet.stellar.org/";

export const useContractOperations = (walletAddress) => {
  const server = new rpc.Server(RPC_URL);

  const initiateEscrow = async ({
    makerAddress,
    treasuryAddress,
    shopperAddress,
    amount,
    creatorAddress,
  }) => {
    if (!walletAddress) {
      throw new Error("Wallet not connected");
    }

    try {
      const account = await server.getAccount(walletAddress);
      const contract = new Contract(CONTRACT_ID);

      // Convert amount to u128
      const amountBigInt = BigInt(amount);
      const amountScVal = new XdrLargeInt("u128", [amountBigInt]).toU128();

      const args = [
        "initiate_escrow",
        amountScVal,
        new Address(makerAddress).toScVal(),
        new Address(treasuryAddress).toScVal(),
        new Address(shopperAddress).toScVal(),
        creatorAddress
          ? new Address(creatorAddress).toScVal()
          : nativeToScVal(null),
      ];

      const transaction = new TransactionBuilder(account, {
        fee: "1000",
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(contract.call(...args))
        .setTimeout(30)
        .build();

      const preparedTransaction = await server.prepareTransaction(transaction);
      const signedXDR = await signTransaction(preparedTransaction.toXDR(), {
        networkPassphrase: Networks.TESTNET,
      });

      const result = await server.sendTransaction(
        TransactionBuilder.fromXDR(signedXDR.signedTxXdr, Networks.TESTNET)
      );

      if (result.status === "PENDING") {
        await new Promise((resolve) => setTimeout(resolve, 8000));
        const txResult = await server.getTransaction(result.hash);

        if (txResult.status === "SUCCESS") {
          const returnValue = txResult.returnValue;
          if (returnValue && returnValue._arm === "vec") {
            const tupleValues = returnValue._value;
            const escrowId = scValToNative(tupleValues[1]);
            return { success: true, escrowId };
          }
        }
        throw new Error(txResult.error || "Transaction failed");
      }
      throw new Error("Transaction failed");
    } catch (error) {
      console.error("Error initiating escrow:", error);
      throw error;
    }
  };

  const completeMilestone = async (shopperAddress) => {
    if (!walletAddress) {
      throw new Error("Wallet not connected");
    }

    try {
      const account = await server.getAccount(walletAddress);
      const contract = new Contract(CONTRACT_ID);

      const args = [
        "complete_milestone",
        new Address(shopperAddress).toScVal(),
      ];

      const transaction = new TransactionBuilder(account, {
        fee: "1000",
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(contract.call(...args))
        .setTimeout(30)
        .build();

      const preparedTransaction = await server.prepareTransaction(transaction);
      const signedXDR = await signTransaction(preparedTransaction.toXDR(), {
        networkPassphrase: Networks.TESTNET,
      });

      const result = await server.sendTransaction(
        TransactionBuilder.fromXDR(signedXDR.signedTxXdr, Networks.TESTNET)
      );

      if (result.status === "PENDING") {
        await new Promise((resolve) => setTimeout(resolve, 8000));
        const txResult = await server.getTransaction(result.hash);

        if (txResult.status === "SUCCESS") {
          return { success: true, status: "Milestone completed" };
        }
        throw new Error(txResult.error || "Transaction failed");
      }
      throw new Error("Transaction failed");
    } catch (error) {
      console.error("Error completing milestone:", error);
      throw error;
    }
  };

  const getEscrowBalance = async (shopperAddress) => {
    if (!walletAddress) {
      throw new Error("Wallet not connected");
    }

    try {
      const account = await server.getAccount(walletAddress);
      const contract = new Contract(CONTRACT_ID);

      const args = [
        "get_escrow_balance",
        new Address(shopperAddress).toScVal(),
      ];

      const transaction = new TransactionBuilder(account, {
        fee: "1000",
        networkPassphrase: Networks.TESTNET,
      })
        .addOperation(contract.call(...args))
        .setTimeout(30)
        .build();

      const preparedTransaction = await server.prepareTransaction(transaction);
      const signedXDR = await signTransaction(preparedTransaction.toXDR(), {
        networkPassphrase: Networks.TESTNET,
      });

      const result = await server.sendTransaction(
        TransactionBuilder.fromXDR(signedXDR.signedTxXdr, Networks.TESTNET)
      );

      if (result.status === "PENDING") {
        await new Promise((resolve) => setTimeout(resolve, 8000));
        const txResult = await server.getTransaction(result.hash);

        if (txResult.status === "SUCCESS" && txResult.returnValue) {
          const balance = scValToNative(txResult.returnValue);
          return { success: true, balance };
        }
        throw new Error(txResult.error || "Transaction failed");
      }
      throw new Error("Transaction failed");
    } catch (error) {
      console.error("Error getting escrow balance:", error);
      throw error;
    }
  };

  return {
    initiateEscrow,
    completeMilestone,
    getEscrowBalance,
  };
};
