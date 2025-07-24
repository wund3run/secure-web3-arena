import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Palette, 
  Crown, 
  Shirt, 
  Glasses, 
  Award,
  Lock,
  Unlock,
  Sparkles,
  Save,
  Undo,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/hooks/use-toast';

interface AvatarCustomization {
  baseAvatar: string;
  background: string;
  accessories: {
    hat?: string;
    glasses?: string;
    badge?: string;
    frame?: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface AvatarItem {
  id: string;
  name: string;
  category: 'base' | 'background' | 'hat' | 'glasses' | 'badge' | 'frame';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  unlockRequirement?: {
    type: 'level' | 'achievement' | 'streak' | 'special';
    value: string | number;
    description: string;
  };
  isUnlocked: boolean;
  isNew?: boolean;
}

interface AuditorAvatarProps {
  className?: string;
  onCustomizationChange?: (customization: AvatarCustomization) => void;
}

const AuditorAvatar: React.FC<AuditorAvatarProps> = ({ 
  className, 
  onCustomizationChange 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [currentCustomization, setCurrentCustomization] = useState<AvatarCustomization>({
    baseAvatar: 'avatar-1',
    background: 'bg-gradient-blue',
    accessories: {},
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6', 
      accent: '#f59e0b'
    }
  });
  
  const [savedCustomization, setSavedCustomization] = useState<AvatarCustomization>(currentCustomization);
  const [selectedCategory, setSelectedCategory] = useState<AvatarItem['category']>('base');
  const [availableItems, setAvailableItems] = useState<AvatarItem[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    loadAvatarItems();
    loadSavedCustomization();
  }, [user?.id]);

  useEffect(() => {
    const hasChanges = JSON.stringify(currentCustomization) !== JSON.stringify(savedCustomization);
    setHasUnsavedChanges(hasChanges);
  }, [currentCustomization, savedCustomization]);

  const loadAvatarItems = () => {
    // Mock data - in real implementation, this would come from the gamification service
    const items: AvatarItem[] = [
      // Base Avatars
      {
        id: 'avatar-1',
        name: 'Classic Auditor',
        category: 'base',
        rarity: 'common',
        image: '/avatars/base/classic.png',
        isUnlocked: true
      },
      {
        id: 'avatar-2',
        name: 'Tech Specialist',
        category: 'base',
        rarity: 'common',
        image: '/avatars/base/tech.png',
        isUnlocked: true
      },
      {
        id: 'avatar-3',
        name: 'Security Expert',
        category: 'base',
        rarity: 'rare',
        image: '/avatars/base/security.png',
        unlockRequirement: {
          type: 'level',
          value: 5,
          description: 'Reach level 5'
        },
        isUnlocked: true // Mock unlocked
      },
      {
        id: 'avatar-4',
        name: 'Elite Auditor',
        category: 'base',
        rarity: 'epic',
        image: '/avatars/base/elite.png',
        unlockRequirement: {
          type: 'achievement',
          value: 'audit_master',
          description: 'Earn Audit Master badge'
        },
        isUnlocked: false
      },

      // Backgrounds
      {
        id: 'bg-blue',
        name: 'Ocean Blue',
        category: 'background',
        rarity: 'common',
        image: '/avatars/backgrounds/blue.png',
        isUnlocked: true
      },
      {
        id: 'bg-purple',
        name: 'Royal Purple',
        category: 'background',
        rarity: 'common',
        image: '/avatars/backgrounds/purple.png',
        isUnlocked: true
      },
      {
        id: 'bg-cyber',
        name: 'Cyber Matrix',
        category: 'background',
        rarity: 'rare',
        image: '/avatars/backgrounds/cyber.png',
        unlockRequirement: {
          type: 'achievement',
          value: 'ai_pioneer',
          description: 'Earn AI Pioneer badge'
        },
        isUnlocked: true
      },
      {
        id: 'bg-legendary',
        name: 'Legendary Aura',
        category: 'background',
        rarity: 'legendary',
        image: '/avatars/backgrounds/legendary.png',
        unlockRequirement: {
          type: 'special',
          value: 'top_1_percent',
          description: 'Reach top 1% of auditors'
        },
        isUnlocked: false
      },

      // Hats
      {
        id: 'hat-cap',
        name: 'Security Cap',
        category: 'hat',
        rarity: 'common',
        image: '/avatars/hats/cap.png',
        isUnlocked: true
      },
      {
        id: 'hat-crown',
        name: 'Crown of Excellence',
        category: 'hat',
        rarity: 'legendary',
        image: '/avatars/hats/crown.png',
        unlockRequirement: {
          type: 'achievement',
          value: 'perfectionist',
          description: 'Earn Perfectionist badge'
        },
        isUnlocked: false,
        isNew: true
      },

      // Glasses
      {
        id: 'glasses-classic',
        name: 'Classic Glasses',
        category: 'glasses',
        rarity: 'common',
        image: '/avatars/glasses/classic.png',
        isUnlocked: true
      },
      {
        id: 'glasses-ar',
        name: 'AR Visor',
        category: 'glasses',
        rarity: 'epic',
        image: '/avatars/glasses/ar.png',
        unlockRequirement: {
          type: 'streak',
          value: 30,
          description: 'Maintain 30-day streak'
        },
        isUnlocked: false
      },

      // Badges
      {
        id: 'badge-rookie',
        name: 'Rookie Badge',
        category: 'badge',
        rarity: 'common',
        image: '/avatars/badges/rookie.png',
        isUnlocked: true
      },
      {
        id: 'badge-expert',
        name: 'Expert Badge',
        category: 'badge',
        rarity: 'rare',
        image: '/avatars/badges/expert.png',
        unlockRequirement: {
          type: 'level',
          value: 10,
          description: 'Reach level 10'
        },
        isUnlocked: false
      },

      // Frames
      {
        id: 'frame-basic',
        name: 'Basic Frame',
        category: 'frame',
        rarity: 'common',
        image: '/avatars/frames/basic.png',
        isUnlocked: true
      },
      {
        id: 'frame-gold',
        name: 'Golden Frame',
        category: 'frame',
        rarity: 'epic',
        image: '/avatars/frames/gold.png',
        unlockRequirement: {
          type: 'achievement',
          value: 'community_hero',
          description: 'Earn Community Hero badge'
        },
        isUnlocked: false
      }
    ];

    setAvailableItems(items);
  };

  const loadSavedCustomization = async () => {
    if (!user?.id) return;

    try {
      // In real implementation, load from database
      const saved = localStorage.getItem(`avatar_customization_${user.id}`);
      if (saved) {
        const customization = JSON.parse(saved);
        setCurrentCustomization(customization);
        setSavedCustomization(customization);
      }
    } catch (error) {
      console.error('Error loading avatar customization:', error);
    }
  };

  const saveCustomization = async () => {
    if (!user?.id) return;

    try {
      // In real implementation, save to database
      localStorage.setItem(`avatar_customization_${user.id}`, JSON.stringify(currentCustomization));
      setSavedCustomization(currentCustomization);
      setHasUnsavedChanges(false);
      
      onCustomizationChange?.(currentCustomization);
      
      toast({
        title: "Avatar Updated!",
        description: "Your avatar customization has been saved.",
      });
    } catch (error) {
      console.error('Error saving avatar customization:', error);
      toast({
        title: "Error",
        description: "Failed to save avatar customization.",
        variant: "destructive"
      });
    }
  };

  const resetCustomization = () => {
    setCurrentCustomization(savedCustomization);
    setHasUnsavedChanges(false);
  };

  const selectItem = (item: AvatarItem) => {
    if (!item.isUnlocked) return;

    setCurrentCustomization(prev => {
      const updated = { ...prev };
      
      switch (item.category) {
        case 'base':
          updated.baseAvatar = item.id;
          break;
        case 'background':
          updated.background = item.id;
          break;
        case 'hat':
        case 'glasses':
        case 'badge':
        case 'frame':
          updated.accessories = {
            ...updated.accessories,
            [item.category]: item.id
          };
          break;
      }
      
      return updated;
    });
  };

  const removeAccessory = (category: keyof AvatarCustomization['accessories']) => {
    setCurrentCustomization(prev => ({
      ...prev,
      accessories: {
        ...prev.accessories,
        [category]: undefined
      }
    }));
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'border-gray-300 bg-gray-50',
      rare: 'border-blue-300 bg-blue-50',
      epic: 'border-purple-300 bg-purple-50',
      legendary: 'border-yellow-300 bg-yellow-50'
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const getRarityGlow = (rarity: string) => {
    const glows = {
      common: '',
      rare: 'shadow-blue-200',
      epic: 'shadow-purple-200',
      legendary: 'shadow-yellow-200 shadow-lg'
    };
    return glows[rarity as keyof typeof glows] || '';
  };

  const isItemSelected = (item: AvatarItem): boolean => {
    switch (item.category) {
      case 'base':
        return currentCustomization.baseAvatar === item.id;
      case 'background':
        return currentCustomization.background === item.id;
      default:
        return currentCustomization.accessories[item.category as keyof typeof currentCustomization.accessories] === item.id;
    }
  };

  const getItemsByCategory = (category: AvatarItem['category']): AvatarItem[] => {
    return availableItems.filter(item => item.category === category);
  };

  const AvatarPreview = () => (
    <div className="relative">
      <div className="w-32 h-32 mx-auto mb-4 relative">
        {/* Background */}
        <div className={`absolute inset-0 rounded-full ${currentCustomization.background}`} 
             style={{ background: `linear-gradient(135deg, ${currentCustomization.colors.primary}, ${currentCustomization.colors.secondary})` }}>
        </div>
        
        {/* Frame */}
        {currentCustomization.accessories.frame && (
          <div className="absolute inset-0 rounded-full border-4 border-yellow-400 shadow-lg"></div>
        )}
        
        {/* Base Avatar */}
        <Avatar className="w-full h-full">
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback className="text-2xl font-bold text-white">
            {user?.user_metadata?.full_name?.[0] || 'A'}
          </AvatarFallback>
        </Avatar>
        
        {/* Hat */}
        {currentCustomization.accessories.hat && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <Crown className="h-8 w-8 text-yellow-500" />
          </div>
        )}
        
        {/* Glasses */}
        {currentCustomization.accessories.glasses && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Glasses className="h-6 w-6 text-gray-700" />
          </div>
        )}
        
        {/* Badge */}
        {currentCustomization.accessories.badge && (
          <div className="absolute bottom-0 right-0">
            <Award className="h-6 w-6 text-blue-500" />
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-center space-x-2">
        <Button
          onClick={saveCustomization}
          disabled={!hasUnsavedChanges}
          size="sm"
          className="flex items-center space-x-1"
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </Button>
        
        <Button
          onClick={resetCustomization}
          disabled={!hasUnsavedChanges}
          variant="outline"
          size="sm"
          className="flex items-center space-x-1"
        >
          <Undo className="h-4 w-4" />
          <span>Reset</span>
        </Button>
      </div>
    </div>
  );

  const ItemGrid = ({ category }: { category: AvatarItem['category'] }) => {
    const items = getItemsByCategory(category);
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`relative p-3 border-2 rounded-lg cursor-pointer transition-all ${
              isItemSelected(item)
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : item.isUnlocked
                ? `${getRarityColor(item.rarity)} hover:shadow-md`
                : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
            } ${getRarityGlow(item.rarity)}`}
            onClick={() => selectItem(item)}
          >
            {/* New Item Indicator */}
            {item.isNew && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                !
              </div>
            )}
            
            {/* Lock/Unlock Indicator */}
            <div className="absolute top-2 right-2">
              {item.isUnlocked ? (
                <Unlock className="h-4 w-4 text-green-500" />
              ) : (
                <Lock className="h-4 w-4 text-gray-400" />
              )}
            </div>
            
            {/* Item Preview */}
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
              {/* In real implementation, show actual image */}
              <div className="text-2xl">
                {category === 'base' && <User />}
                {category === 'hat' && <Crown />}
                {category === 'glasses' && <Glasses />}
                {category === 'badge' && <Award />}
                {category === 'frame' && <Sparkles />}
                {category === 'background' && <Palette />}
              </div>
            </div>
            
            {/* Item Info */}
            <div className="text-center">
              <h4 className="font-semibold text-sm">{item.name}</h4>
              <Badge 
                variant="outline" 
                className={`text-xs mt-1 ${
                  item.rarity === 'legendary' ? 'border-yellow-500 text-yellow-700' :
                  item.rarity === 'epic' ? 'border-purple-500 text-purple-700' :
                  item.rarity === 'rare' ? 'border-blue-500 text-blue-700' :
                  'border-gray-500 text-gray-700'
                }`}
              >
                {item.rarity}
              </Badge>
              
              {/* Unlock Requirement */}
              {!item.isUnlocked && item.unlockRequirement && (
                <p className="text-xs text-gray-500 mt-1">
                  {item.unlockRequirement.description}
                </p>
              )}
            </div>
            
            {/* Selected Indicator */}
            {isItemSelected(item) && (
              <div className="absolute inset-0 border-2 border-blue-500 rounded-lg bg-blue-100/20 flex items-center justify-center">
                <div className="bg-blue-500 text-white rounded-full p-1">
                  ✓
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <User className="h-5 w-5" />
            <span>Avatar Customization</span>
          </CardTitle>
          <CardDescription>
            Personalize your auditor avatar with unlockable items and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvatarPreview />
        </CardContent>
      </Card>

      {/* Customization Tabs */}
      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as AvatarItem['category'])}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="base">Base</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="hat">Hats</TabsTrigger>
          <TabsTrigger value="glasses">Glasses</TabsTrigger>
          <TabsTrigger value="badge">Badges</TabsTrigger>
          <TabsTrigger value="frame">Frames</TabsTrigger>
        </TabsList>

        <TabsContent value="base" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Base Avatars</h3>
            <Badge variant="outline">{getItemsByCategory('base').filter(i => i.isUnlocked).length} unlocked</Badge>
          </div>
          <ItemGrid category="base" />
        </TabsContent>

        <TabsContent value="background" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Backgrounds</h3>
            <Badge variant="outline">{getItemsByCategory('background').filter(i => i.isUnlocked).length} unlocked</Badge>
          </div>
          <ItemGrid category="background" />
        </TabsContent>

        <TabsContent value="hat" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Hats & Crowns</h3>
            <Badge variant="outline">{getItemsByCategory('hat').filter(i => i.isUnlocked).length} unlocked</Badge>
          </div>
          <ItemGrid category="hat" />
        </TabsContent>

        <TabsContent value="glasses" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Glasses & Visors</h3>
            <Badge variant="outline">{getItemsByCategory('glasses').filter(i => i.isUnlocked).length} unlocked</Badge>
          </div>
          <ItemGrid category="glasses" />
        </TabsContent>

        <TabsContent value="badge" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Achievement Badges</h3>
            <Badge variant="outline">{getItemsByCategory('badge').filter(i => i.isUnlocked).length} unlocked</Badge>
          </div>
          <ItemGrid category="badge" />
        </TabsContent>

        <TabsContent value="frame" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Avatar Frames</h3>
            <Badge variant="outline">{getItemsByCategory('frame').filter(i => i.isUnlocked).length} unlocked</Badge>
          </div>
          <ItemGrid category="frame" />
        </TabsContent>
      </Tabs>

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-orange-700">
              <RefreshCw className="h-4 w-4" />
              <span className="font-medium">You have unsaved changes</span>
            </div>
            <p className="text-sm text-orange-600 mt-1">
              Remember to save your customization to keep your changes.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AuditorAvatar; 