// utils/config.js
export const ETHEREUM_CONFIG = {
  network: process.env.NEXT_PUBLIC_ETHEREUM_NETWORK || "mainnet",
  rpcEndpoint:
    process.env.NEXT_PUBLIC_RPC_ENDPOINT ||
    "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID || "0x1",
};

// Network-specific configurations
export const NETWORK_CONFIG = {
  mainnet: {
    name: "Ethereum Mainnet",
    chainId: "0x1",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://etherscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  goerli: {
    name: "Goerli Testnet",
    chainId: "0x5",
    rpcUrl: "https://goerli.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://goerli.etherscan.io",
    nativeCurrency: {
      name: "Goerli Ether",
      symbol: "ETH",
      decimals: 18,
    },
    faucet: "https://goerlifaucet.com/",
  },
  sepolia: {
    name: "Sepolia Testnet",
    chainId: "0xaa36a7",
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://sepolia.etherscan.io",
    nativeCurrency: {
      name: "Sepolia Ether",
      symbol: "ETH",
      decimals: 18,
    },
    faucet: "https://sepoliafaucet.com/",
  },
  polygon: {
    name: "Polygon Mainnet",
    chainId: "0x89",
    rpcUrl: "https://polygon-mainnet.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://polygonscan.com",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
  },
  mumbai: {
    name: "Polygon Mumbai",
    chainId: "0x13881",
    rpcUrl: "https://polygon-mumbai.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://mumbai.polygonscan.com",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    faucet: "https://faucet.polygon.technology/",
  },
};

// Popular ERC-20 token addresses
export const TOKEN_LIST = {
  mainnet: {
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    USDC: "0xA0b86a33E6417c9C39b4d9d458bC7fb29C1c5E84",
    DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    UNI: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  },
  goerli: {
    USDT: "0x509Ee0d083DdF8AC028f2a56731412edD63223B9",
    USDC: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    DAI: "0x73967c6a0904aA032C103b4104747E88c566B1A2",
    WETH: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  },
};
