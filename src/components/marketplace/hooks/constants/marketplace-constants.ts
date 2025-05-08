
import { BlockchainEcosystem, Review } from "../types/marketplace-types";

// Define blockchain ecosystems
export const BLOCKCHAIN_ECOSYSTEMS: BlockchainEcosystem[] = [
  { name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024", logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024", color: "#627EEA" },
  { name: "Solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=024", logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=024", color: "#9945FF" },
  { name: "Polkadot", logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=024", logoUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=024", color: "#E6007A" },
  { name: "Avalanche", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=024", logoUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=024", color: "#E84142" },
  { name: "Cosmos", logo: "https://cryptologos.cc/logos/cosmos-atom-logo.svg?v=024", logoUrl: "https://cryptologos.cc/logos/cosmos-atom-logo.svg?v=024", color: "#2E3148" },
  { name: "Near", logo: "https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=024", logoUrl: "https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=024", color: "#000000" },
  { name: "Binance", logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=024", logoUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=024", color: "#F3BA2F" }
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
