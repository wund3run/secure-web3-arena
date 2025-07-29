import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const ProfileCompletionWizard: React.FC = () => {
  const { user, userProfile, getUserType } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    display_name: userProfile?.display_name || '',
    bio: userProfile?.bio || '',
    website: userProfile?.website || '',
    years_of_experience: userProfile?.years_of_experience || 0,
    skills: userProfile?.skills?.join(', ') || '',
    specializations: userProfile?.specializations?.join(', ') || ''
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const updateData = {
        full_name: formData.display_name,
        bio: formData.bio,
        website: formData.website,
        years_of_experience: Number(formData.years_of_experience),
        skills: formData.skills.split(',').map((s: string) => s.trim()).filter(Boolean),
        specializations: formData.specializations.split(',').map((s: string) => s.trim()).filter(Boolean)
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);
        
      if (error) {
        throw error;
      }

      toast.success('Profile updated successfully!');
      
      // Redirect based on user type from roles
      const userType = getUserType();
      const redirectPath = userType === 'auditor' 
        ? '/dashboard/auditor' 
        : '/dashboard/project';
      
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isProfileComplete = () => {
    const userType = getUserType();
    const hasBasicInfo = formData.display_name && formData.bio;
    
    if (userType === 'auditor') {
      return hasBasicInfo && formData.years_of_experience > 0 && formData.skills;
    }
    
    return hasBasicInfo;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Complete Your Profile</CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Help us personalize your experience by completing your profile
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="display_name">Display Name *</Label>
                <Input
                  id="display_name"
                  value={formData.display_name}
                  onChange={(e) => handleInputChange('display_name', e.target.value)}
                  placeholder="How you'd like to be known"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself and your expertise"
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://your-website.com"
                />
              </div>

              {getUserType() === 'auditor' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="years_of_experience">Years of Experience *</Label>
                    <Input
                      id="years_of_experience"
                      type="number"
                      min="0"
                      value={formData.years_of_experience}
                      onChange={(e) => handleInputChange('years_of_experience', Number(e.target.value))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills *</Label>
                    <Input
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => handleInputChange('skills', e.target.value)}
                      placeholder="Solidity, Smart Contracts, DeFi, etc. (comma-separated)"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specializations">Specializations</Label>
                    <Input
                      id="specializations"
                      value={formData.specializations}
                      onChange={(e) => handleInputChange('specializations', e.target.value)}
                      placeholder="DeFi Protocols, NFT Contracts, etc. (comma-separated)"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  disabled={loading}
                >
                  Skip for Now
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !isProfileComplete()}
                >
                  {loading ? 'Saving...' : 'Complete Profile'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
