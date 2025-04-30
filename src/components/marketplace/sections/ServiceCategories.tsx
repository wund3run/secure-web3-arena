
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ServiceCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function ServiceCategories({ activeCategory, setActiveCategory }: ServiceCategoriesProps) {
  return (
    <Tabs 
      defaultValue="all" 
      className="w-full mb-8" 
      onValueChange={setActiveCategory}
      value={activeCategory}
    >
      <div className="overflow-x-auto pb-2">
        <TabsList className="inline-flex h-auto p-1 gap-2 w-auto flex-nowrap">
          <TabsTrigger value="all" className="px-4 py-2 rounded-md whitespace-nowrap">All</TabsTrigger>
          <TabsTrigger value="smart contracts" className="px-4 py-2 rounded-md whitespace-nowrap">Smart Contracts</TabsTrigger>
          <TabsTrigger value="dapps" className="px-4 py-2 rounded-md whitespace-nowrap">DApps</TabsTrigger>
          <TabsTrigger value="protocols" className="px-4 py-2 rounded-md whitespace-nowrap">Protocols</TabsTrigger>
          <TabsTrigger value="nfts" className="px-4 py-2 rounded-md whitespace-nowrap">NFTs</TabsTrigger>
          <TabsTrigger value="bridges" className="px-4 py-2 rounded-md whitespace-nowrap">Bridges</TabsTrigger>
          <TabsTrigger value="infrastructure" className="px-4 py-2 rounded-md whitespace-nowrap">Infrastructure</TabsTrigger>
          <TabsTrigger value="daos" className="px-4 py-2 rounded-md whitespace-nowrap">DAOs</TabsTrigger>
          <TabsTrigger value="zk proofs" className="px-4 py-2 rounded-md whitespace-nowrap">ZK Proofs</TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  );
}
