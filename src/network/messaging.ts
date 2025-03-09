// types.ts
export interface BalanceResponse {
  balance: string;
}

export interface APIError {
  error: string;
}

export const getWalletBalance = async (
  address: string
): Promise<BalanceResponse> => {
  if (!address) {
    throw new Error("Address is required");
  }

  const response = await fetch(`/api/get-escrow-balance?from=${address}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch balance");
  }

  return data;
};
