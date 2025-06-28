// components/EthereumWalletProvider.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Define a context for Ethereum Wallet
const EthereumWalletContext = createContext<any>(null);

export const useEthereumWallet = () => {
  return useContext(EthereumWalletContext);
};

export const EthereumWalletProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [account, setAccount] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check if the wallet is connected on mount
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setConnected(true);
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts.length > 0 ? accounts[0] : null);
        setConnected(accounts.length > 0);
      });
    }
  }, []);

  return (
    <EthereumWalletContext.Provider value={{ account, connected }}>
      {children}
    </EthereumWalletContext.Provider>
  );
};
