"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  isConnected,
  requestAccess,
  getAddress,
  getNetwork,
} from "@stellar/freighter-api";
import { WalletContextType } from "@/types/Wallet";

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const FWalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connectStatus, setConnectStatus] = useState<string>("Initializing...");
  const [network, setNetwork] = useState<string | null>(null);

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        const connectionStatus = await isConnected();
        if (connectionStatus.isConnected) {
          const addressObj = await getAddress();
          setWalletAddress(addressObj.address);
          const networkObj = await getNetwork();
          setNetwork(networkObj.network);
          setConnectStatus("Connected");
        } else {
          setConnectStatus("Ready to connect");
        }
      } catch (error) {
        console.error("Error initializing wallet:", error);
        setConnectStatus("Error initializing wallet");
      }
    };

    initializeWallet();
  }, []);

  const connectWallet = async () => {
    try {
      setConnectStatus("Connecting...");
      const accessObj = await requestAccess();
      if ("error" in accessObj) {
        throw new Error(accessObj.error);
      }
      setWalletAddress(accessObj.address);
      const networkObj = await getNetwork();
      setNetwork(networkObj.network);
      setConnectStatus("Connected");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setConnectStatus("Connection failed");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setNetwork(null);
    setConnectStatus("Disconnected");
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        connectStatus,
        network,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
