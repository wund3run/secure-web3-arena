import { UserPreferences } from '@/hooks/useUserProfiling';

export interface PreferenceSectionProps {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
}

export interface NotificationSettingsProps extends PreferenceSectionProps {
  onNotificationChange: (key: string, value: boolean) => void;
}
