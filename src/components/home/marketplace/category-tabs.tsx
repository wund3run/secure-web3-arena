
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function CategoryTabs({ activeTab, onTabChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <Tabs defaultValue={activeTab} className="w-full" onValueChange={onTabChange}>
        <TabsList className="inline-flex h-auto p-1 gap-2 w-auto flex-wrap">
          <TabsTrigger value="all" className="px-4 py-2 rounded-md">All</TabsTrigger>
          <TabsTrigger value="smart contracts" className="px-4 py-2 rounded-md">Smart Contracts</TabsTrigger>
          <TabsTrigger value="dapps" className="px-4 py-2 rounded-md">DApps</TabsTrigger>
          <TabsTrigger value="protocols" className="px-4 py-2 rounded-md">Protocols</TabsTrigger>
          <TabsTrigger value="nfts" className="px-4 py-2 rounded-md">NFTs</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
