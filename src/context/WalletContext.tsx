import { createContext, useContext, useState, ReactNode } from "react";
import type { MetaMaskInpageProvider } from "@metamask/providers"; // ✅ Add this import

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

interface WalletContextType {
  account: string | null;
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  account: null,
  connectWallet: async () => {},
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found. Please install it from https://metamask.io/");
      return;
    }

    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];
      setAccount(accounts[0]);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  return (
    <WalletContext.Provider value={{ account, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
