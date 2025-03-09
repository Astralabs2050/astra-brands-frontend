"use client";
import React from "react";
import { useWallet } from "../context/WalletProvider";

const WalletConnect = () => {
  const {
    walletAddress,
    connectStatus,
    connectWallet,
    disconnectWallet,
    network,
  } = useWallet();

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Freighter Wallet Connection
      </h2>
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          disabled={connectStatus === "Connecting..."}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
        >
          {connectStatus === "Connecting..."
            ? "Connecting..."
            : "Connect Wallet"}
        </button>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-700">
            Connected Wallet: {walletAddress.slice(0, 6)}...
            {walletAddress.slice(-4)}
          </p>
          <p className="text-gray-700">Network: {network}</p>
          <button
            onClick={disconnectWallet}
            className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
      <p className="mt-4 text-gray-600">Status: {connectStatus}</p>
    </div>
  );
};

export default WalletConnect;
