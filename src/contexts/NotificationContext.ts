import { createContext } from 'react';
import { NotificationContextType } from '@/types/notification.types';

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined); 