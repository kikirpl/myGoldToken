// utils/ethereumProgram.js
export class EthereumProgram {
  constructor() {
    this.ethereum = window.ethereum;
  }

  // Check if MetaMask is installed
  isMetaMaskInstalled() {
    return typeof this.ethereum !== "undefined";
  }

  // Get current account
  async getCurrentAccount() {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }

    const accounts = await this.ethereum.request({
      method: "eth_accounts",
    });
    return accounts.length > 0 ? accounts[0] : null;
  }

  // Connect wallet
  async connectWallet() {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }

    const accounts = await this.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  }

  // Get balance
  async getBalance(address) {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }

    const balance = await this.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });

    // Convert from Wei to ETH
    return parseInt(balance, 16) / Math.pow(10, 18);
  }

  // Transfer ETH
  async transferETH(toAddress, amount) {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }

    const fromAddress = await this.getCurrentAccount();
    if (!fromAddress) {
      throw new Error("No account connected");
    }

    // Convert ETH to Wei
    const amountInWei = (amount * Math.pow(10, 18)).toString(16);

    const txHash = await this.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: fromAddress,
          to: toAddress,
          value: "0x" + amountInWei,
        },
      ],
    });

    return txHash;
  }

  // Transfer ERC-20 Token
  async transferToken(tokenAddress, toAddress, amount, decimals = 18) {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }

    const fromAddress = await this.getCurrentAccount();
    if (!fromAddress) {
      throw new Error("No account connected");
    }

    // ERC-20 transfer function signature
    const transferFunction = "0xa9059cbb";

    // Encode recipient address (32 bytes)
    const recipientAddress = toAddress.slice(2).padStart(64, "0");

    // Encode amount (32 bytes)
    const amountInWei = (amount * Math.pow(10, decimals)).toString(16);
    const encodedAmount = amountInWei.padStart(64, "0");

    // Combine function signature with parameters
    const data = transferFunction + recipientAddress + encodedAmount;

    const txHash = await this.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: fromAddress,
          to: tokenAddress,
          data: data,
        },
      ],
    });

    return txHash;
  }

  // Get ERC-20 token balance
  async getTokenBalance(tokenAddress, walletAddress, decimals = 18) {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }

    // ERC-20 balanceOf function signature
    const balanceOfFunction = "0x70a08231";

    // Encode wallet address (32 bytes)
    const encodedAddress = walletAddress.slice(2).padStart(64, "0");

    // Combine function signature with parameter
    const data = balanceOfFunction + encodedAddress;

    const balance = await this.ethereum.request({
      method: "eth_call",
      params: [
        {
          to: tokenAddress,
          data: data,
        },
        "latest",
      ],
    });

    // Convert from Wei to token units
    return parseInt(balance, 16) / Math.pow(10, decimals);
  }

  // Buy Token via DEX (1inch example)
  async buyTokenVia1inch(tokenAddress, amount, slippage = 1) {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }

    const fromAddress = await this.getCurrentAccount();
    if (!fromAddress) {
      throw new Error("No account connected");
    }

    try {
      const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
      const amountInWei = (amount * Math.pow(10, 18)).toString();
      const chainId = 1; // Ethereum mainnet

      // Get swap data from 1inch API
      const response = await fetch(
        `https://api.1inch.dev/swap/v5.2/${chainId}/swap?src=${ETH_ADDRESS}&dst=${tokenAddress}&amount=${amountInWei}&from=${fromAddress}&slippage=${slippage}`
      );

      if (!response.ok) {
        throw new Error("Failed to get swap data");
      }

      const swapData = await response.json();

      // Execute swap transaction
      const txHash = await this.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: fromAddress,
            to: swapData.tx.to,
            data: swapData.tx.data,
            value: swapData.tx.value,
            gas: swapData.tx.gas,
          },
        ],
      });

      return { txHash, swapData };
    } catch (error) {
      console.error("Token purchase failed:", error);
      throw error;
    }
  }

  // Get token price from CoinGecko
  async getTokenPrice(tokenAddress) {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddress}&vs_currencies=usd`
      );
      const data = await response.json();
      return data[tokenAddress.toLowerCase()]?.usd || null;
    } catch (error) {
      console.error("Error fetching token price:", error);
      return null;
    }
  }

  // Switch network
  async switchNetwork(chainId) {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }

    try {
      await this.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (error) {
      // If network doesn't exist, add it
      if (error.code === 4902) {
        throw new Error("Network not found. Please add the network manually.");
      }
      throw error;
    }
  }

  // Add network to MetaMask
  async addNetwork(networkConfig) {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }

    await this.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [networkConfig],
    });
  }

  // Get current network
  async getCurrentNetwork() {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }

    const chainId = await this.ethereum.request({
      method: "eth_chainId",
    });

    const networkNames = {
      "0x1": "Ethereum Mainnet",
      "0x3": "Ropsten Testnet",
      "0x4": "Rinkeby Testnet",
      "0x5": "Goerli Testnet",
      "0xaa36a7": "Sepolia Testnet",
      "0x89": "Polygon Mainnet",
      "0x13881": "Polygon Mumbai",
    };

    return {
      chainId,
      name: networkNames[chainId] || `Chain ID: ${chainId}`,
    };
  }
}
