
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEscrow } from '@/contexts/EscrowContext';
import { toast } from 'sonner';

interface CreateEscrowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateEscrowDialog({ open, onOpenChange }: CreateEscrowDialogProps) {
  const { createContract } = useEscrow();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    auditor_id: '',
    total_amount: '',
    currency: 'ETH',
    milestones: [{ title: '', description: '', amount: '' }]
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const milestonesData = formData.milestones.map(m => ({
        title: m.title,
        description: m.description,
        amount: parseFloat(m.amount) || 0
      }));

      const contractId = await createContract(
        {
          title: formData.title,
          description: formData.description,
          auditor_id: formData.auditor_id,
          total_amount: parseFloat(formData.total_amount),
          currency: formData.currency,
        },
        milestonesData
      );

      if (contractId) {
        toast.success('Escrow contract created successfully');
        onOpenChange(false);
        setFormData({
          title: '',
          description: '',
          auditor_id: '',
          total_amount: '',
          currency: 'ETH',
          milestones: [{ title: '', description: '', amount: '' }]
        });
      }
    } catch (error) {
      console.error('Error creating contract:', error);
      toast.error('Failed to create escrow contract');
    } finally {
      setLoading(false);
    }
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { title: '', description: '', amount: '' }]
    }));
  };

  const updateMilestone = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) =>
        i === index ? { ...milestone, [field]: value } : milestone
      )
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Escrow Contract</DialogTitle>
          <DialogDescription>
            Set up a secure escrow contract for your audit project
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Contract Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Smart Contract Audit"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="auditor">Auditor ID</Label>
              <Input
                id="auditor"
                value={formData.auditor_id}
                onChange={(e) => setFormData(prev => ({ ...prev, auditor_id: e.target.value }))}
                placeholder="Enter auditor user ID"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the audit scope and requirements"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Total Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.total_amount}
                onChange={(e) => setFormData(prev => ({ ...prev, total_amount: e.target.value }))}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Milestones</Label>
              <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                Add Milestone
              </Button>
            </div>

            {formData.milestones.map((milestone, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Milestone title"
                    value={milestone.title}
                    onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                    required
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    value={milestone.amount}
                    onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                    required
                  />
                </div>
                <Textarea
                  placeholder="Milestone description"
                  value={milestone.description}
                  onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                  rows={2}
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Contract'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
