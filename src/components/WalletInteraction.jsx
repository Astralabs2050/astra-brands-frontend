"use client";

import React, { useState } from "react";
// import { useWallet } from "../lib/context/WalletProvider";
import {
  TransactionBuilder,
  Networks,
  Contract,
  Address,
  XdrLargeInt,
  nativeToScVal,
  scValToNative,
  rpc,
} from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";
import { useWallet } from "@/context/WalletProvider";

const CONTRACT_ID = "CDHSSGBZSCGEUBZ63E4KJWCMTGOMK53XIVNBVJGVMYXDYJQFBTKECGGV";
const RPC_URL = "https://soroban-testnet.stellar.org/";

const ContractInteraction = () => {
  const [amount, setAmount] = useState("");
  const [maker, setMaker] = useState("");
  const [treasury, setTreasury] = useState("");
  const [shopper, setShopper] = useState("");
  const [creator, setCreator] = useState("");
  const [escrowBalance, setEscrowBalance] = useState();
  const [escrowCount, setEscrowCount] = useState();
  const [escrowId, setEscrowId] = useState("");
  const [status, setStatus] = useState("");
  const { walletAddress } = useWallet();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const parseU128Manually = (value) => {
    if (
      !value ||
      value._arm !== "u128" ||
      !value._value ||
      !value._value._attributes
    ) {
      throw new Error("Invalid u128 value structure");
    }

    try {
      const hi = BigInt(value._value._attributes.hi._value || "0");
      const lo = BigInt(value._value._attributes.lo._value || "0");
      const result = (hi << 64n) + lo;
      return result.toString();
    } catch (error) {
      console.error("Error parsing u128 manually:", error);
      throw new Error("Failed to parse u128 value");
    }
  };

  const initiateEscrow = async () => {
    if (!walletAddress) {
      setStatus("Please connect your wallet first.");
      return;
    }

    try {
      const server = new rpc.Server(RPC_URL);
      const contract = new Contract(CONTRACT_ID);
      const account = await server.getAccount(walletAddress);

      const amountBigInt = BigInt(amount);
      if (
        amountBigInt < 0 ||
        amountBigInt > BigInt("340282366920938463463374607431768211455")
      ) {
        throw new Error("Amount out of range for u128");
      }

      const amountScVal = new XdrLargeInt("u128", [amountBigInt]).toU128();

      const args = [
        "initiate_escrow",
        amountScVal,
        new Address(maker).toScVal(),
        new Address(treasury).toScVal(),
        new Address(shopper).toScVal(),
        creator ? new Address(creator).toScVal() : nativeToScVal(null),
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
        setStatus(`Transaction submitted and pending. Hash: ${result.hash}`);
        await sleep(8000);

        const txResult = await server.getTransaction(result.hash);

        if (txResult.status === "SUCCESS") {
          const returnValue = txResult.returnValue;

          if (returnValue && returnValue._arm === "vec") {
            const tupleValues = returnValue._value;
            const escrowId = scValToNative(tupleValues[1]);
            setEscrowId(escrowId.toString());
            setStatus(`Escrow initiated successfully! Escrow ID: ${escrowId}`);
          }
        } else {
          setStatus(`Transaction failed: ${txResult.error || "Unknown error"}`);
        }
      }
    } catch (error) {
      console.error("Error initiating escrow:", error);
      setStatus(`Failed to initiate escrow: ${error.message}`);
    }
  };

  const completeMilestone = async () => {
    if (!walletAddress) {
      setStatus("Please connect your wallet first.");
      return;
    }

    try {
      const server = new rpc.Server(RPC_URL);
      const contract = new Contract(CONTRACT_ID);
      const account = await server.getAccount(walletAddress);

      const args = [
        "complete_milestone",
        new Address(shopper).toScVal(),
        nativeToScVal(parseInt(escrowId, 10), { type: "u64" }),
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
        setStatus(`Transaction submitted and pending. Hash: ${result.hash}`);
        await sleep(8000);

        const txResult = await server.getTransaction(result.hash);

        if (txResult.status === "SUCCESS") {
          const symbolValue = scValToNative(txResult.returnValue);
          setStatus(`Milestone completed successfully! Symbol: ${symbolValue}`);
        } else {
          setStatus(`Transaction failed: ${txResult.error || "Unknown error"}`);
        }
      }
    } catch (error) {
      console.error("Error completing milestone:", error);
      setStatus(`Failed to complete milestone: ${error.message}`);
    }
  };

  const getEscrowBalance = async () => {
    if (!walletAddress) {
      setStatus("Please connect your wallet first.");
      return;
    }

    try {
      const server = new rpc.Server(RPC_URL);
      const contract = new Contract(CONTRACT_ID);
      const account = await server.getAccount(walletAddress);

      const args = [
        "get_escrow_balance",
        new Address(shopper).toScVal(),
        nativeToScVal(parseInt(escrowId, 10), { type: "u64" }),
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
        setStatus(`Transaction submitted and pending. Hash: ${result.hash}`);
        await sleep(8000);

        const txResult = await server.getTransaction(result.hash);

        if (txResult.status === "SUCCESS") {
          const balance = parseU128Manually(txResult.returnValue);
          setEscrowBalance(balance);
          setStatus(`Escrow balance retrieved: ${balance}`);
        } else {
          setStatus(`Transaction failed: ${txResult.error || "Unknown error"}`);
        }
      }
    } catch (error) {
      console.error("Error getting escrow balance:", error);
      setStatus(`Failed to get escrow balance: ${error.message}`);
    }
  };

  const getEscrowCount = async () => {
    if (!walletAddress) {
      setStatus("Please connect your wallet first.");
      return;
    }

    try {
      const server = new rpc.Server(RPC_URL);
      const contract = new Contract(CONTRACT_ID);
      const account = await server.getAccount(walletAddress);

      const args = ["get_escrow_count", new Address(shopper).toScVal()];

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
        setStatus(`Transaction submitted and pending. Hash: ${result.hash}`);
        await sleep(8000);

        const txResult = await server.getTransaction(result.hash);

        if (txResult.status === "SUCCESS") {
          const count = parseInt(txResult.returnValue._value, 10);
          setEscrowCount(count);
          setStatus(`Escrow count retrieved: ${count}`);
        } else {
          setStatus(`Transaction failed: ${txResult.error || "Unknown error"}`);
        }
      }
    } catch (error) {
      console.error("Error getting escrow count:", error);
      setStatus(`Failed to get escrow count: ${error.message}`);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Amount (u128)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Maker Address"
          value={maker}
          onChange={(e) => setMaker(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Treasury Address"
          value={treasury}
          onChange={(e) => setTreasury(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Shopper Address"
          value={shopper}
          onChange={(e) => setShopper(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Creator Address (optional)"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Escrow ID"
          value={escrowId}
          onChange={(e) => setEscrowId(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-x-4">
        <button
          onClick={initiateEscrow}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Initiate Escrow
        </button>
        <button
          onClick={completeMilestone}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Complete Milestone
        </button>
        <button
          onClick={getEscrowBalance}
          className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Get Escrow Balance
        </button>
        <button
          onClick={getEscrowCount}
          className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Get Escrow Count
        </button>
      </div>

      {escrowBalance !== null && (
        <p className="text-gray-700">Escrow Balance: {escrowBalance}</p>
      )}
      {escrowCount !== null && (
        <p className="text-gray-700">Escrow Count: {escrowCount}</p>
      )}
      <p className="text-gray-600">{status}</p>
    </div>
  );
};

export default ContractInteraction;
