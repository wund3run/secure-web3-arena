
import { BlockchainEcosystem, Review } from "../types/marketplace-types";

// Define blockchain ecosystems
export const BLOCKCHAIN_ECOSYSTEMS: BlockchainEcosystem[] = [
  { id: "ethereum", name: "Ethereum", logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024", projectCount: 1245, color: "#627EEA" },
  { id: "solana", name: "Solana", logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=024", projectCount: 789, color: "#9945FF" },
  { id: "polkadot", name: "Polkadot", logoUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=024", projectCount: 432, color: "#E6007A" },
  { id: "avalanche", name: "Avalanche", logoUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=024", projectCount: 367, color: "#E84142" },
  { id: "cosmos", name: "Cosmos", logoUrl: "https://cryptologos.cc/logos/cosmos-atom-logo.svg?v=024", projectCount: 289, color: "#2E3148" },
  { id: "near", name: "Near", logoUrl: "https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=024", projectCount: 176, color: "#000000" },
  { id: "binance", name: "Binance", logoUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=024", projectCount: 654, color: "#F3BA2F" }
];

// Sample reviews for the marketplace
export const SAMPLE_REVIEWS: Review[] = [
  {
    id: "r1",
    username: "CryptoBuilder",
    date: "2023-12-10",
    rating: 4.5,
    text: "The audit was thorough and helped us identify critical vulnerabilities before launch. Great communication throughout the process.",
    author: "CryptoBuilder",
    content: "The audit was thorough and helped us identify critical vulnerabilities before launch. Great communication throughout the process.",
    helpful: 5
  },
  {
    id: "r2",
    username: "DeFiDeveloper",
    date: "2023-11-25",
    rating: 5,
    text: "Excellent service! The security recommendations were invaluable and potentially saved us from a major exploit.",
    author: "DeFiDeveloper",
    content: "Excellent service! The security recommendations were invaluable and potentially saved us from a major exploit.",
    helpful: 8
  },
  {
    id: "r3",
    username: "BlockchainStartup",
    date: "2023-12-18",
    rating: 4,
    text: "Professional audit with detailed reporting. Would have appreciated more guidance on implementing the fixes.",
    author: "BlockchainStartup",
    content: "Professional audit with detailed reporting. Would have appreciated more guidance on implementing the fixes.",
    helpful: 3
  }
];
