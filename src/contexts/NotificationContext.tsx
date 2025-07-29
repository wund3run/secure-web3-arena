import React, { createContext, useContext, useState, ReactNode } from "react";

export type NotificationType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "audit_created"
  | "approval_requested"
  | "approval_approved"
  | "approval_rejected"
  | "collaboration_invite"
  | "bulk_action";

export type Notification = {
  id: number;
  type: NotificationType;
  message: string;
  title?: string;
  category?: string;
  timestamp?: Date;
  read?: boolean;
  actionUrl?: string;
  actionLabel?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

type NotificationContextType = {
  notifications: Notification[];
  notify: (notification: Omit<Notification, "id">) => void;
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  removeNotification: (id: number) => void;
};

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

let notificationId = 0;

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (notification: Omit<Notification, "id">) => {
    setNotifications((prev) => [
      ...prev,
      {
        ...notification,
        id: ++notificationId,
        read: false,
        timestamp: new Date(),
      },
    ]);
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      notify,
      unreadCount,
      markAsRead,
      markAllAsRead,
      clearAll,
      removeNotification,
    }}>
      {children}
      {/* Optionally render notification popups here */}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
};