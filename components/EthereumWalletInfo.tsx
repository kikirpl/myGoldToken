// components/EthereumWalletInfo.tsx
import { useState, useEffect } from "react";

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (eventName: string, handler: (...args: any[]) => void) => void;
  removeListener: (
    eventName: string,
    handler: (...args: any[]) => void
  ) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export default function EthereumWalletInfo() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState<string>("");

  useEffect(() => {
    checkConnection();
    getNetworkInfo();
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          fetchBalance(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    }
  };

  const getNetworkInfo = async () => {
    if (window.ethereum) {
      try {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const networkNames: { [key: string]: string } = {
          "0x1": "Ethereum Mainnet",
          "0x3": "Ropsten Testnet",
          "0x4": "Rinkeby Testnet",
          "0x5": "Goerli Testnet",
          "0xaa36a7": "Sepolia Testnet",
          "0x89": "Polygon Mainnet",
          "0x13881": "Polygon Mumbai",
        };
        setNetwork(networkNames[chainId] || `Chain ID: ${chainId}`);
      } catch (error) {
        console.error("Error getting network info:", error);
      }
    }
  };

  const fetchBalance = async (address?: string) => {
    if (!window.ethereum) return;

    const targetAddress = address || account;
    if (!targetAddress) return;

    setLoading(true);
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [targetAddress, "latest"],
      });

      // Convert from Wei to ETH
      const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
      setBalance(balanceInEth.toFixed(6));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
    setLoading(false);
  };

  if (!account) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-300">
          Please connect your MetaMask wallet to view balance
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-yellow-400">Wallet Information</h3>

      <div className="bg-gray-800 rounded-lg p-4">
        <p className="text-sm text-gray-300 mb-2">Network:</p>
        <p className="text-blue-400 font-semibold">{network}</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <p className="text-sm text-gray-300 mb-2">Address:</p>
        <p className="text-white font-mono text-xs break-all bg-gray-700 p-2 rounded">
          {account}
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
            <span className="ml-2 text-gray-300">Loading balance...</span>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-300 mb-2">Balance:</p>
            <p className="text-xl font-bold text-green-400">{balance} ETH</p>
          </div>
        )}
      </div>

      <button
        onClick={() => fetchBalance()}
        disabled={loading}
        className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Refreshing..." : "Refresh Balance"}
      </button>
    </div>
  );
}
