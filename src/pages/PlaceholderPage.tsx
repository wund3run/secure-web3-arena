import React from 'react';

interface PlaceholderPageProps {
  title?: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title = "Coming Soon", 
  description = "This page is under development" 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;

// Named exports for backward compatibility
export const Partners = () => <PlaceholderPage title="Partners" description="Partner directory coming soon" />;
export const Challenges = () => <PlaceholderPage title="Challenges" description="Security challenges coming soon" />;
export const Events = () => <PlaceholderPage title="Events" description="Events calendar coming soon" />;
export const Leaderboard = () => <PlaceholderPage title="Leaderboard" description="Community leaderboard coming soon" />;
export const AuditGuidelines = () => <PlaceholderPage title="Audit Guidelines" description="Comprehensive audit guidelines coming soon" />;
export const Templates = () => <PlaceholderPage title="Templates" description="Audit templates coming soon" />;
export const VulnerabilityDatabase = () => <PlaceholderPage title="Vulnerability Database" description="Vulnerability database coming soon" />;
export const Documentation = () => <PlaceholderPage title="Documentation" description="Platform documentation coming soon" />;
export const FileManagement = () => <PlaceholderPage title="File Management" description="File management tools coming soon" />;
export const PlatformReports = () => <PlaceholderPage title="Platform Reports" description="Advanced reporting coming soon" />;
export const VulnerabilityScanner = () => <PlaceholderPage title="Vulnerability Scanner" description="Automated vulnerability scanning coming soon" />;
export const Profile = () => <PlaceholderPage title="Profile" description="User profile management coming soon" />;
export const Settings = () => <PlaceholderPage title="Settings" description="User settings coming soon" />;
