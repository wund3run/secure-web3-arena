
/**
 * Utility functions for handling category images in service cards
 */

/**
 * Gets a themed image URL for a specific category
 */
export const getCategoryImage = (category: string): string => {
  const images: Record<string, string> = {
    "Smart Contracts": "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-50",
    "DApps": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-30",
    "Protocols": "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=1600&auto=format&fit=crop&blend=7E69AB&blend-mode=multiply&sat=-40",
    "NFTs": "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1600&auto=format&fit=crop&blend=8B5CF6&blend-mode=multiply&sat=-30",
    "Bridges": "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop&blend=6E59A5&blend-mode=multiply&sat=-40",
    "Infrastructure": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-30",
    "DAOs": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1600&auto=format&fit=crop&blend=7E69AB&blend-mode=multiply&sat=-30",
    "ZK Proofs": "https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1600&auto=format&fit=crop&blend=8B5CF6&blend-mode=multiply&sat=-30",
    "default": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop&blend=9b87f5&blend-mode=multiply&sat=-40"
  };
  
  return images[category] || images["default"];
};
