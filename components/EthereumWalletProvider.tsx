import React, { createContext, useContext, useState, useEffect } from "react";

interface EthereumWalletContextType {
  account: string | null;
  connected: boolean;
}

const EthereumWalletContext = createContext<
  EthereumWalletContextType | undefined
>(undefined);

export const useEthereumWallet = (): EthereumWalletContextType => {
  const context = useContext(EthereumWalletContext);
  if (!context) {
    throw new Error(
      "useEthereumWallet must be used within EthereumWalletProvider"
    );
  }
  return context;
};

export const EthereumWalletProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [account, setAccount] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = (await window.ethereum.request({
            method: "eth_accounts",
          })) as string[];
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

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (...args: unknown[]) => {
        const accounts = args[0] as string[];
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
