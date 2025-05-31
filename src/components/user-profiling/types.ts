
export interface PreferenceSectionProps {
  preferences: any;
  updatePreferences: (updates: any) => void;
}

export interface NotificationSettingsProps extends PreferenceSectionProps {
  onNotificationChange: (key: string, value: boolean) => void;
}
