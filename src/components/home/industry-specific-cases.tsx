
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Coins, Gamepad2, ShoppingBag, Users, TrendingUp, Banknote } from 'lucide-react';

const INDUSTRY_CASES = [
  {
    icon: Coins,
    title: "DeFi Protocols",
    description: "Liquidity pools, yield farming, AMMs",
    examples: ["Uniswap-style DEX", "Lending protocols", "Staking mechanisms"],
    riskLevel: "Critical",
    averagePrice: "$15,000",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Gamepad2,
    title: "Gaming & NFTs",
    description: "Play-to-earn, NFT marketplaces, metaverse",
    examples: ["NFT minting contracts", "Game asset trading", "Reward distribution"],
    riskLevel: "High",
    averagePrice: "$8,000",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    description: "Payment processing, loyalty programs",
    examples: ["Payment gateways", "Token rewards", "Supply chain tracking"],
    riskLevel: "Medium",
    averagePrice: "$5,000",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Users,
    title: "DAOs & Governance",
    description: "Voting mechanisms, treasury management",
    examples: ["Governance tokens", "Proposal systems", "Treasury vaults"],
    riskLevel: "High",
    averagePrice: "$12,000",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: TrendingUp,
    title: "Trading & Analytics",
    description: "DEX aggregators, trading bots",
    examples: ["Price oracles", "Arbitrage systems", "Analytics platforms"],
    riskLevel: "High",
    averagePrice: "$10,000",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Banknote,
    title: "Fintech & Payments",
    description: "Cross-border payments, stablecoins",
    examples: ["Stablecoin protocols", "Remittance systems", "Credit scoring"],
    riskLevel: "Critical",
    averagePrice: "$18,000",
    color: "from-emerald-500 to-blue-500"
  }
];

export function IndustrySpecificCases() {
  return (
    <section className="py-16 bg-muted/10">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Industry-Specific Security Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every Web3 sector has unique security challenges. Our experts specialize in your industry's specific risks and requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRY_CASES.map((industry, index) => (
            <Card key={index} className="hover:shadow-lg transition-all group border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${industry.color} mr-3`}>
                    <industry.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{industry.title}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Risk:</span>
                      <span className={`font-medium ${
                        industry.riskLevel === 'Critical' ? 'text-red-500' : 
                        industry.riskLevel === 'High' ? 'text-orange-500' : 'text-yellow-500'
                      }`}>
                        {industry.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{industry.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-2">Common Use Cases:</h4>
                  <ul className="space-y-1">
                    {industry.examples.map((example, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    <div className="font-semibold text-primary">{industry.averagePrice}</div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/request-audit" className="flex items-center">
                      Get Quote <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Don't see your industry? We work with all Web3 sectors and can customize our approach.
          </p>
          <Button asChild variant="outline">
            <Link to="/contact" className="flex items-center">
              Discuss Custom Solution <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
