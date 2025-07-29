
import React from "react";
import { Wallet } from "lucide-react";

export function TransactionsPanel() {
  return (
    <>
      <h3 className="text-lg font-medium">Recent Transactions</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Track deposits, payments, and refunds across all contracts
      </p>
      
      {/* Transactions content would go here */}
      <div className="text-center py-8 text-muted-foreground">
        <p>No transactions to display</p>
        <p className="text-sm">Transactions will appear here once contracts are created and funded</p>
      </div>
    </>
  );
}
