
import { useState } from "react";
import { useEscrow } from "@/contexts/EscrowContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContractsList } from "./ContractsList";
import { ArbitrationPanel } from "./arbitration/ArbitrationPanel";
import { TransactionsPanel } from "./transactions/TransactionsPanel";
import { FileCheck, Shield, AlertTriangle } from "lucide-react";

interface EscrowOverviewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCreateNew: () => void;
}

export function EscrowOverview({ activeTab, setActiveTab, onCreateNew }: EscrowOverviewProps) {
  const { profile } = useEscrow();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Escrow Dashboard</CardTitle>
        <CardDescription>
          View and manage your security audit escrow contracts
        </CardDescription>
        <Tabs defaultValue="contracts" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="arbitration">Arbitration</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <TabsContent value="contracts" className="mt-0">
          <ContractsList />
        </TabsContent>
        <TabsContent value="arbitration" className="mt-0">
          <ArbitrationPanel />
        </TabsContent>
        <TabsContent value="transactions" className="mt-0">
          <TransactionsPanel />
        </TabsContent>
      </CardContent>
    </Card>
  );
}
