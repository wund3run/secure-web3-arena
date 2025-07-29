
import { SelectOption } from "./types";

// Arrays for multi-select options
export const expertiseAreas: SelectOption[] = [
  { value: "smart-contracts", label: "Smart Contracts" },
  { value: "defi", label: "DeFi" },
  { value: "nft", label: "NFTs & Marketplaces" },
  { value: "bridges", label: "Cross-chain Bridges" },
  { value: "layer2", label: "Layer 2 Solutions" },
  { value: "dao", label: "DAOs" },
  { value: "wallet", label: "Wallet Security" },
  { value: "gamefi", label: "GameFi" },
];

export const blockchainOptions: SelectOption[] = [
  { value: "ethereum", label: "Ethereum" },
  { value: "solana", label: "Solana" },
  { value: "polygon", label: "Polygon" },
  { value: "avalanche", label: "Avalanche" },
  { value: "bsc", label: "BSC" },
  { value: "near", label: "NEAR" },
  { value: "polkadot", label: "Polkadot" },
  { value: "cosmos", label: "Cosmos" },
  { value: "other", label: "Other" },
];

export const securityToolOptions: SelectOption[] = [
  { value: "mythril", label: "Mythril" },
  { value: "slither", label: "Slither" },
  { value: "manticore", label: "Manticore" },
  { value: "echidna", label: "Echidna" },
  { value: "scribble", label: "Scribble" },
  { value: "securify", label: "Securify" },
  { value: "oyente", label: "Oyente" },
  { value: "custom", label: "Custom Tools" },
];

export const experienceOptions: SelectOption[] = [
  { value: "protocol-audits", label: "Protocol Audits" },
  { value: "pre-launch-audits", label: "Pre-Launch Audits" },
  { value: "post-launch-audits", label: "Post-Launch Audits" },
  { value: "bug-bounties", label: "Bug Bounties" },
  { value: "incident-response", label: "Incident Response" },
  { value: "red-team", label: "Red Team Exercises" },
];

export const serviceTypeOptions: SelectOption[] = [
  { value: "smart-contract-audit", label: "Smart Contract Audit" },
  { value: "protocol-audit", label: "Protocol Audit" },
  { value: "penetration-testing", label: "Penetration Testing" },
  { value: "code-review", label: "Code Review" },
  { value: "architecture-review", label: "Architecture Review" },
  { value: "security-consulting", label: "Security Consulting" },
  { value: "threat-modeling", label: "Threat Modeling" },
  { value: "incident-response", label: "Incident Response" },
  { value: "security-training", label: "Security Training" },
  { value: "continuous-monitoring", label: "Continuous Monitoring" },
];
