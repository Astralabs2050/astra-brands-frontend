import WalletConnect from "@/components/WalletConnect";
import ContractInteraction from "@/components/WalletInteraction";

export default function Test() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">
        Freighter Wallet Integration
      </h1>
      <div className="max-w-4xl mx-auto space-y-8">
        <WalletConnect />
        <ContractInteraction />
      </div>
    </main>
  );
}
