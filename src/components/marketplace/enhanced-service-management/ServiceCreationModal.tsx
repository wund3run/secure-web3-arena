
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useMarketplaceServices } from '@/hooks/useMarketplaceServices';
import { toast } from 'sonner';
import { X } from 'lucide-react';

interface ServiceCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categories = [
  'Smart Contract Audit',
  'DeFi Protocol Review',
  'NFT Security Assessment',
  'Bridge Audit',
  'DAO Security Review',
  'Penetration Testing'
];

const blockchains = [
  'Ethereum',
  'Polygon',
  'Binance Smart Chain',
  'Arbitrum',
  'Optimism',
  'Solana',
  'Avalanche',
  'Fantom'
];

export const ServiceCreationModal: React.FC<ServiceCreationModalProps> = ({
  open,
  onOpenChange
}) => {
  const { createService } = useMarketplaceServices();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    min_price: 0,
    max_price: 0,
    delivery_time: 7,
    blockchain_ecosystems: [] as string[],
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addBlockchain = (blockchain: string) => {
    if (!formData.blockchain_ecosystems.includes(blockchain)) {
      setFormData(prev => ({
        ...prev,
        blockchain_ecosystems: [...prev.blockchain_ecosystems, blockchain]
      }));
    }
  };

  const removeBlockchain = (blockchain: string) => {
    setFormData(prev => ({
      ...prev,
      blockchain_ecosystems: prev.blockchain_ecosystems.filter(b => b !== blockchain)
    }));
  };

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createService({
        ...formData,
        price_range: {
          min: formData.min_price,
          max: formData.max_price,
          currency: 'USD'
        }
      });
      toast.success('Service created successfully');
      onOpenChange(false);
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        min_price: 0,
        max_price: 0,
        delivery_time: 7,
        blockchain_ecosystems: [],
        tags: []
      });
    } catch (error) {
      toast.error('Failed to create service');
      console.error('Service creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Security Service</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Service Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Smart Contract Security Audit"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your security service in detail..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery_time">Delivery Time (days)</Label>
              <Input
                id="delivery_time"
                type="number"
                min="1"
                max="365"
                value={formData.delivery_time}
                onChange={(e) => handleInputChange('delivery_time', parseInt(e.target.value) || 7)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min_price">Minimum Price (USD)</Label>
              <Input
                id="min_price"
                type="number"
                min="0"
                value={formData.min_price}
                onChange={(e) => handleInputChange('min_price', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_price">Maximum Price (USD)</Label>
              <Input
                id="max_price"
                type="number"
                min="0"
                value={formData.max_price}
                onChange={(e) => handleInputChange('max_price', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Blockchain Ecosystems</Label>
            <Select onValueChange={addBlockchain}>
              <SelectTrigger>
                <SelectValue placeholder="Add blockchain ecosystem" />
              </SelectTrigger>
              <SelectContent>
                {blockchains
                  .filter(blockchain => !formData.blockchain_ecosystems.includes(blockchain))
                  .map(blockchain => (
                    <SelectItem key={blockchain} value={blockchain}>{blockchain}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.blockchain_ecosystems.map(blockchain => (
                <Badge key={blockchain} variant="secondary" className="flex items-center gap-1">
                  {blockchain}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeBlockchain(blockchain)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="outline" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Service'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
