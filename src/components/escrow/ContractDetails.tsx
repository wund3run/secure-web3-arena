
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle, 
  Calendar, 
  Check, 
  ChevronRight, 
  Clock, 
  FileCheck, 
  FileText,
  Lock,
  MessageSquare,
  Wallet 
} from "lucide-react";
import { 
  useEscrow, 
  EscrowContract, 
  Milestone, 
  Transaction, 
  Dispute 
} from "@/contexts/EscrowContext";
import { toast } from "sonner";

interface ContractDetailsProps {
  contract: EscrowContract;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContractDetails({ contract, open, onOpenChange }: ContractDetailsProps) {
  const { fetchMilestones, fetchTransactions, fetchDisputes, profile, updateMilestone, createDispute } = useEscrow();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [disputeReason, setDisputeReason] = useState("");
  const [submittingDispute, setSubmittingDispute] = useState(false);
  
  // Fetch contract details when the dialog opens
  useEffect(() => {
    if (open && contract) {
      const loadData = async () => {
        setLoading(true);
        
        try {
          const [milestonesData, transactionsData, disputesData] = await Promise.all([
            fetchMilestones(contract.id),
            fetchTransactions(contract.id),
            fetchDisputes(contract.id)
          ]);
          
          setMilestones(milestonesData);
          setTransactions(transactionsData);
          setDisputes(disputesData);
        } catch (error) {
          console.error('Error loading contract details:', error);
          toast.error('Failed to load contract details');
        } finally {
          setLoading(false);
        }
      };
      
      loadData();
    }
  }, [contract, open, fetchMilestones, fetchTransactions, fetchDisputes]);
  
  const handleMarkMilestoneComplete = async (milestone: Milestone) => {
    if (!profile) return;
    
    // Only the auditor can mark milestones as complete
    if (contract.auditor_id !== profile.id) {
      toast.error('Only the auditor can mark milestones as complete');
      return;
    }
    
    const result = await updateMilestone({
      ...milestone,
      is_completed: true,
      completed_at: new Date().toISOString()
    });
    
    if (result) {
      // Refresh milestones data
      const updatedMilestones = await fetchMilestones(contract.id);
      setMilestones(updatedMilestones);
    }
  };
  
  const handleCreateDispute = async () => {
    if (!profile) return;
    
    if (!disputeReason.trim()) {
      toast.error('Please provide a reason for the dispute');
      return;
    }
    
    setSubmittingDispute(true);
    
    try {
      const disputeId = await createDispute({
        escrow_contract_id: contract.id,
        reason: disputeReason,
        status: 'opened'
      });
      
      if (disputeId) {
        setDisputeReason("");
        const updatedDisputes = await fetchDisputes(contract.id);
        setDisputes(updatedDisputes);
      }
    } finally {
      setSubmittingDispute(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case 'disputed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Disputed</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Refunded</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>{contract.title}</DialogTitle>
            {getStatusBadge(contract.status)}
          </div>
          <DialogDescription>
            Contract ID: {contract.id}
          </DialogDescription>
        </DialogHeader>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Client</h3>
                <p>{contract.client?.full_name || "Unknown"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Security Auditor</h3>
                <p>{contract.auditor?.full_name || "Unknown"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Value</h3>
                <div className="flex items-center gap-1">
                  <Wallet className="h-4 w-4" />
                  <span className="font-medium">{contract.total_amount} {contract.currency}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Created On</h3>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(contract.created_at)}</span>
                </div>
              </div>
            </div>
            
            {contract.description && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                <p className="text-sm whitespace-pre-line">{contract.description}</p>
              </div>
            )}
            
            {contract.requires_multisig && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md text-sm">
                <Lock className="h-4 w-4" />
                <span>
                  This contract requires multi-signature approval for fund transfers.
                </span>
              </div>
            )}
            
            <Separator />
            
            <Tabs defaultValue="milestones">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="disputes">Disputes</TabsTrigger>
              </TabsList>
              <TabsContent value="milestones" className="space-y-4 pt-4">
                {milestones.length > 0 ? (
                  <div className="space-y-4">
                    {milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className={`border rounded-lg p-4 ${
                          milestone.is_completed ? "bg-green-50 border-green-200" : "bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{milestone.title}</h3>
                          {milestone.is_completed ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <Check className="h-3.5 w-3.5 mr-1" /> Completed
                            </Badge>
                          ) : (
                            <Badge variant="outline">Pending</Badge>
                          )}
                        </div>
                        
                        {milestone.description && (
                          <p className="text-sm mb-3 text-gray-700">{milestone.description}</p>
                        )}
                        
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Wallet className="h-4 w-4" />
                            <span>{milestone.amount} {contract.currency}</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {milestone.deadline && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>Due: {formatDate(milestone.deadline)}</span>
                              </div>
                            )}
                            
                            {milestone.is_completed ? (
                              <div className="flex items-center gap-1 text-green-600">
                                <Check className="h-4 w-4" />
                                <span>Completed: {milestone.completed_at ? formatDate(milestone.completed_at) : "N/A"}</span>
                              </div>
                            ) : (
                              profile?.id === contract.auditor_id && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleMarkMilestoneComplete(milestone)}
                                >
                                  Mark Complete
                                </Button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <FileCheck className="mx-auto h-8 w-8 mb-2" />
                    <p>No milestones defined for this contract.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="transactions" className="space-y-4 pt-4">
                {transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center gap-4 border rounded-lg p-4">
                        <div className="bg-primary/10 p-2 rounded">
                          <Wallet className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium capitalize">{tx.type.replace('_', ' ')}</span>
                            <Badge variant="outline">{tx.status}</Badge>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              {formatDate(tx.created_at)}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{tx.amount} {contract.currency}</span>
                              <ChevronRight className="h-3 w-3" />
                              <span className="text-sm truncate max-w-[120px]">
                                {tx.recipient?.full_name || "Unknown"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Wallet className="mx-auto h-8 w-8 mb-2" />
                    <p>No transactions recorded for this contract yet.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="disputes" className="space-y-4 pt-4">
                {disputes.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {disputes.map((dispute) => (
                      <AccordionItem key={dispute.id} value={dispute.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <AlertTriangle className={`h-4 w-4 ${
                              dispute.status === "resolved" ? "text-green-600" : "text-red-600"
                            }`} />
                            <div>
                              <div className="font-medium">
                                Dispute {dispute.status === "resolved" ? "(Resolved)" : ""}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatDate(dispute.created_at)}
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 px-4 py-2">
                            <div className="bg-muted/50 p-3 rounded text-sm">
                              <div className="font-medium mb-1">Reason:</div>
                              <p>{dispute.reason}</p>
                            </div>
                            
                            {dispute.resolution && (
                              <div className="bg-green-50 border border-green-100 p-3 rounded text-sm">
                                <div className="font-medium mb-1">Resolution:</div>
                                <p>{dispute.resolution}</p>
                              </div>
                            )}
                            
                            {dispute.comments && dispute.comments.length > 0 && (
                              <div className="space-y-3 mt-4">
                                <h4 className="text-sm font-medium flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4" /> Discussion
                                </h4>
                                {dispute.comments.map((comment) => (
                                  <div key={comment.id} className="border rounded p-3 text-sm">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-medium">
                                        {comment.user?.full_name || "Unknown User"}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {formatDate(comment.created_at)}
                                      </span>
                                    </div>
                                    <p>{comment.comment}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <>
                    <div className="text-center py-6 text-muted-foreground">
                      <FileText className="mx-auto h-8 w-8 mb-2" />
                      <p>No disputes have been raised for this contract.</p>
                    </div>
                    {contract.status !== 'cancelled' && contract.status !== 'completed' && (
                      <div className="border rounded-lg p-4 mt-4">
                        <h4 className="font-medium mb-2">Raise a Dispute</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          If you're experiencing issues with this contract, you can raise a dispute for arbitration.
                        </p>
                        <Textarea
                          placeholder="Explain the reason for the dispute..."
                          value={disputeReason}
                          onChange={(e) => setDisputeReason(e.target.value)}
                          className="mb-4"
                        />
                        <Button 
                          onClick={handleCreateDispute}
                          disabled={submittingDispute || !disputeReason.trim()}
                        >
                          {submittingDispute ? "Submitting..." : "Submit Dispute"}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
