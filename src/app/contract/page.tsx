"use client";
import React, { useState } from "react";

function App() {
  const [makerAddress, setMakerAddress] = useState("");
  const [treasuryAddress, setTreasuryAddress] = useState("");
  const [creatorAddress, setCreatorAddress] = useState("");
  const [shopperAddress, setShopperAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [escrowStatus, setEscrowStatus] = useState("No Escrow Started");
  const [currentStep, setCurrentStep] = useState("");
  const [milestoneStatus, setMilestoneStatus] = useState("Not Started");
  const [balance, setBalance] = useState<string | null>(null);

  // Function to initiate escrow
  const initiateEscrow = async () => {
    try {
      const response = await fetch("/api/initiate-escrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          makerAddress,
          treasuryAddress,
          shopper: shopperAddress,
          amount,
          creator: creatorAddress || null,
        }),
      });

      const data = await response.json();
      setEscrowStatus(
        `Escrow started successfully with status: ${data.status}`
      );
      setCurrentStep("Initiate Escrow");
    } catch (err) {
      console.error("Failed to initiate escrow", err);
      setEscrowStatus("Failed to initiate escrow");
    }
  };

  // Function to complete a milestone
  const completeMilestone = async () => {
    try {
      const response = await fetch("/api/complete-milestone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: shopperAddress,
        }),
      });

      const data = await response.json();
      const statusMessage = data.status;
      setMilestoneStatus(statusMessage);
      setEscrowStatus(`Milestone completed: ${statusMessage}`);
      setCurrentStep("Complete Milestone");
    } catch (err) {
      console.error("Failed to complete milestone", err);
      setEscrowStatus("Failed to complete milestone");
    }
  };

  // Function to fetch escrow balance
  const fetchEscrowBalance = async () => {
    try {
      const response = await fetch(
        `/api/get-escrow-balance?from=${shopperAddress}`
      );
      const data = await response.json();
      setBalance(data.balance);
    } catch (err) {
      console.error("Failed to fetch escrow balance", err);
      setBalance("Error fetching balance");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Escrow Management Interface</h1>

      {/* Section to initiate an escrow */}
      <div
        className={`p-6 rounded-lg mb-8 ${
          currentStep === "Initiate Escrow"
            ? "border-2 border-green-500"
            : "border border-gray-300"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Initiate Escrow</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Maker Address"
            value={makerAddress}
            onChange={(e) => setMakerAddress(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Treasury Address"
            value={treasuryAddress}
            onChange={(e) => setTreasuryAddress(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Shopper Address"
            value={shopperAddress}
            onChange={(e) => setShopperAddress(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Creator Address (Optional)"
            value={creatorAddress}
            onChange={(e) => setCreatorAddress(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={initiateEscrow}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Initiate Escrow
          </button>
        </div>
      </div>

      {/* Section to complete a milestone */}
      <div
        className={`p-6 rounded-lg mb-8 ${
          currentStep === "Complete Milestone"
            ? "border-2 border-green-500"
            : "border border-gray-300"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Complete a Milestone</h2>
        <button
          onClick={completeMilestone}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Complete Milestone
        </button>
        <p className="mt-4">Current Milestone Status: {milestoneStatus}</p>
      </div>

      {/* Escrow Status Display */}
      <div className="p-6 border rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Escrow Status</h2>
        <p>{escrowStatus}</p>
        <p>Current Step: {currentStep}</p>
      </div>

      {/* Button to Fetch Escrow Balance */}
      <div className="p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Escrow Balance</h2>
        <button
          onClick={fetchEscrowBalance}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Get Escrow Balance
        </button>
        <p className="mt-4">
          {balance !== null
            ? balance
            : "Balance will appear here once fetched."}
        </p>
      </div>
    </div>
  );
}

export default App;
