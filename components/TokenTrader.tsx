// components/TokenTrader.tsx
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

interface Quote {
  toAmount: string;
  estimatedGas: string;
  toToken: {
    symbol: string;
    decimals: number;
  };
}

export default function TokenTrader() {
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

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

  const getQuote = async () => {
    if (!tokenAddress || !amount) {
      alert("Please enter both token address and amount");
      return;
    }

    setLoading(true);
    try {
      // Using 1inch API for getting quotes (example)
      const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
      const amountInWei = (parseFloat(amount) * Math.pow(10, 18)).toString();
      const chainId = 1; // Ethereum mainnet

      const response = await fetch(
        `https://api.1inch.dev/swap/v5.2/${chainId}/quote?src=${ETH_ADDRESS}&dst=${tokenAddress}&amount=${amountInWei}`
      );

      if (!response.ok) {
        throw new Error("Failed to get quote");
      }

      const quoteData = await response.json();
      setQuote(quoteData);
    } catch (error) {
      console.error("Error getting quote:", error);
      alert("Error getting quote. Please check token address and try again.");
    }
    setLoading(false);
  };

  const buyToken = async () => {
    if (!quote || !connected || !window.ethereum) return;

    setLoading(true);
    try {
      // This is a simplified example - you would need to implement
      // actual swap logic using DEX aggregators like 1inch, Uniswap, etc.

      const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
      const amountInWei = (parseFloat(amount) * Math.pow(10, 18)).toString();
      const chainId = 1;

      // Get swap transaction data
      const swapResponse = await fetch(
        `https://api.1inch.dev/swap/v5.2/${chainId}/swap?src=${ETH_ADDRESS}&dst=${tokenAddress}&amount=${amountInWei}&from=${account}&slippage=1`
      );

      if (!swapResponse.ok) {
        throw new Error("Failed to get swap transaction");
      }

      const swapData = await swapResponse.json();

      // Send transaction
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: swapData.tx.to,
            data: swapData.tx.data,
            value: swapData.tx.value,
            gas: swapData.tx.gas,
          },
        ],
      });

      alert(`Transaction sent! Hash: ${txHash}`);

      // Reset form after successful trade
      setQuote(null);
      setAmount("");
      setTokenAddress("");
    } catch (error) {
      console.error("Error buying token:", error);
      alert("Error buying token. Please try again.");
    }
    setLoading(false);
  };

  if (!connected) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-300">
          Please connect your MetaMask wallet to trade tokens
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-yellow-400">Token Trading</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Token Address (ERC-20 Token)
          </label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="Enter ERC-20 token address..."
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.1"
            step="0.01"
            min="0"
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={getQuote}
            disabled={loading || !tokenAddress || !amount}
            className="flex-1 bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Getting Quote...
              </div>
            ) : (
              "Get Quote"
            )}
          </button>

          {quote && (
            <button
              onClick={buyToken}
              disabled={loading}
              className="flex-1 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Buying...
                </div>
              ) : (
                "Buy Token"
              )}
            </button>
          )}
        </div>

        {quote && (
          <div className="bg-gray-800 rounded-lg p-4 space-y-2">
            <h4 className="text-yellow-400 font-semibold">Quote:</h4>
            <p className="text-green-400">
              You'll receive: ~
              {(
                parseInt(quote.toAmount) / Math.pow(10, quote.toToken.decimals)
              ).toFixed(6)}{" "}
              {quote.toToken.symbol}
            </p>
            <p className="text-orange-400">
              Estimated Gas: {parseInt(quote.estimatedGas).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
