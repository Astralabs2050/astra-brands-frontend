export interface WalletContextType {
  walletAddress: string | null;
  connectStatus: string;
  network: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}
