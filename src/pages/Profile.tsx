
import React, { useState } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { EnhancedProfileDisplay } from '@/components/profile/EnhancedProfileDisplay';
import { ProfileEditModal } from '@/components/profile/ProfileEditModal';

export default function Profile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <EnhancedProfileDisplay 
            isOwnProfile={true}
            onEdit={handleEditProfile}
          />
        </div>
      </div>

      <ProfileEditModal 
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />
    </ProductionLayout>
  );
}
