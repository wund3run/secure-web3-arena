import React, { createContext, useContext, useState, ReactNode } from "react";

type Notification = {
  id: number;
  type: "success" | "error" | "info" | "warning";
  message: string;
};

type NotificationContextType = {
  notify: (notification: Omit<Notification, "id">) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

let notificationId = 0;

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (notification: Omit<Notification, "id">) => {
    setNotifications((prev) => [
      ...prev,
      { ...notification, id: ++notificationId },
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 4000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`rounded-lg px-4 py-3 shadow-lg text-white ${
              n.type === "success"
                ? "bg-green-600"
                : n.type === "error"
                ? "bg-red-600"
                : n.type === "info"
                ? "bg-blue-600"
                : "bg-yellow-600"
            }`}
          >
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
};
