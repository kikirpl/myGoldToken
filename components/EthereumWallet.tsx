// components/EthereumWallet.tsx
import { useState, useEffect } from "react";

export default function EthereumWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

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

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }

    setConnecting(true);
    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setConnected(true);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
    setConnecting(false);
  };

  const disconnectWallet = () => {
    setAccount(null);
    setConnected(false);
  };

  return (
    <div className="text-center">
      {!connected ? (
        <div className="space-y-4 ">
          <button
            onClick={connectWallet}
            disabled={connecting}
            className=" text-black font-bold  px-4 py-2 hover:bg-white-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {connecting ? "Connecting..." : "Connect Wallet"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-green-400">Wallet Connected</h3>
          <p className="text-white bg-gray-800 rounded-md p-3 font-mono text-sm ">
            {account?.slice(0, 8)}...{account?.slice(-8)}
          </p>
          <button
            onClick={disconnectWallet}
            className="bg-red-500 text-white font-bold rounded-md px-4 py-2 hover:bg-red-600 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}

      {connecting && (
        <p className="text-blue-400 font-medium mt-4">
          Connecting to MetaMask...
        </p>
      )}
    </div>
  );
}
