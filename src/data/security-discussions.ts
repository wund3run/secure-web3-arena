
import { SecurityDiscussion } from "@/components/security/security-discussion-card";

export const securityDiscussions: SecurityDiscussion[] = [
  {
    id: 1,
    title: "Latest approaches to preventing reentrancy exploits",
    category: "smart-contracts",
    categoryLabel: "Smart Contracts",
    author: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    date: "2 days ago",
    preview: "I've been working with several projects implementing various reentrancy prevention mechanisms. The classic mutex approach works well, but I've found some edge cases where it fails.",
    replies: 42,
    points: 128,
    href: "/community"
  },
  {
    id: 2,
    title: "MEV protection strategies for new DeFi protocols",
    category: "defi",
    categoryLabel: "DeFi",
    author: {
      name: "Sarah Ahmed",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    date: "5 days ago",
    preview: "Building a new DEX and concerned about MEV. We're considering implementing a batch auction mechanism similar to what CoW Swap uses.",
    replies: 37,
    points: 95,
    href: "/community"
  },
  {
    id: 3,
    title: "Best practices for secure upgradable proxy patterns",
    category: "smart-contracts",
    categoryLabel: "Smart Contracts",
    author: {
      name: "Michael Zhang",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    date: "1 week ago",
    preview: "Working on a protocol that needs upgradeability, but I'm concerned about security implications. Is the UUPS pattern still considered best practice in 2025?",
    replies: 28,
    points: 83,
    href: "/community"
  },
  {
    id: 4,
    title: "Security implications of EIP-4844 (Proto-Danksharding)",
    category: "layer-2",
    categoryLabel: "Layer 2",
    author: {
      name: "Elena Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    date: "2 weeks ago",
    preview: "With EIP-4844 now live, what security considerations should L2 developers be aware of? How does blob storage affect the security model of rollups?",
    replies: 19,
    points: 76,
    href: "/community"
  },
  {
    id: 5,
    title: "Auditing ZK circuits - tools and approaches",
    category: "zero-knowledge",
    categoryLabel: "Zero Knowledge",
    author: {
      name: "David Wilson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    date: "3 weeks ago",
    preview: "ZK proofs are becoming ubiquitous, but auditing ZK circuits remains challenging. What tools and techniques are people using?",
    replies: 31,
    points: 102,
    href: "/community"
  },
  {
    id: 6,
    title: "Analyzing the recent cross-chain bridge exploit",
    category: "exploits",
    categoryLabel: "Exploits",
    author: {
      name: "Sophia Parker",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    date: "1 month ago",
    preview: "Deep diving into the recent bridge exploit. It looks like the attackers found a novel way to manipulate the message verification on the destination chain.",
    replies: 56,
    points: 210,
    href: "/community"
  }
];
