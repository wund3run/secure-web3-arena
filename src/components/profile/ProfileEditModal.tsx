import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProfileEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  open,
  onOpenChange
}) => {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || '',
    display_name: userProfile?.display_name || '',
    bio: userProfile?.bio || '',
    website: userProfile?.website || '',
    skills: userProfile?.skills?.join(', ') || '',
    specializations: userProfile?.specializations || [],
    years_of_experience: userProfile?.years_of_experience || 0
  });
  const [newSpecialization, setNewSpecialization] = useState('');

  const availableSpecializations = [
    'Smart Contract Security',
    'DeFi Protocols',
    'NFT Security',
    'Layer 2 Solutions',
    'Cross-chain Bridges',
    'DAO Governance',
    'Tokenomics',
    'Flash Loan Attacks',
    'Reentrancy Vulnerabilities',
    'Access Control',
    'Oracle Security',
    'Gas Optimization'
  ];

  const addSpecialization = (spec: string) => {
    if (spec && !formData.specializations.includes(spec)) {
      setFormData(prev => ({
        ...prev,
        specializations: [...prev.specializations, spec]
      }));
      setNewSpecialization('');
    }
  };

  const removeSpecialization = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.filter((s: string) => s !== spec)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await supabase.from('profiles').update({
        full_name: formData.full_name,
        display_name: formData.display_name,
        bio: formData.bio,
        website: formData.website,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        specializations: formData.specializations,
        years_of_experience: formData.years_of_experience
      }).eq('id', user.id);
      toast.success('Profile updated successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="full_name">Full Name</label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="display_name">Display Name</label>
              <Input
                id="display_name"
                value={formData.display_name}
                onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="bio">Bio</label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="website">Website</label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="skills">Skills (comma-separated)</label>
            <Input
              id="skills"
              value={formData.skills}
              onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
              placeholder="Smart Contract Security, DeFi, Penetration Testing"
            />
          </div>
          <div className="space-y-2">
            <label>Specializations</label>
            <div className="flex gap-2 mb-2">
              <Select value={newSpecialization} onValueChange={setNewSpecialization}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Add a specialization" />
                </SelectTrigger>
                <SelectContent>
                  {availableSpecializations
                    .filter(spec => !formData.specializations.includes(spec))
                    .map(spec => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={() => addSpecialization(newSpecialization)}
                disabled={!newSpecialization}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specializations.map((spec: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {spec}
                  <span
                    className="h-3 w-3 cursor-pointer ml-1"
                    onClick={() => removeSpecialization(spec)}
                    style={{ color: '#f87171', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    ×
                  </span>
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="years_of_experience">Years of Experience</label>
            <Input
              id="years_of_experience"
              type="number"
              min="0"
              max="50"
              value={formData.years_of_experience}
              onChange={(e) => setFormData(prev => ({ ...prev, years_of_experience: parseInt(e.target.value) || 0 }))}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
