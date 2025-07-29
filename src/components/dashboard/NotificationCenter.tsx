import { useState } from 'react';
import { useAuth } from '@/contexts/auth/AuthContext.tsx';
import { useNotification } from '@/contexts/NotificationContext.tsx';
import PaymentReceipts from './PaymentReceipts';

interface ExtendedNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  created_at: string;
  metadata?: {
    audit_request_id?: string;
  };
}

interface NotificationListProps {
  notifications: ExtendedNotification[];
}

const NotificationList = ({ notifications }: NotificationListProps) => {
  return (
    <div>
      {notifications.map((notification) => (
        <div key={notification.id}>
          <strong>{notification.title}</strong>: {notification.message}
        </div>
      ))}
    </div>
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export default function NotificationCenter() {
  const { user } = useAuth();
  const { notifications: contextNotifications } = useNotification();
  const [tab, setTab] = useState<'all' | 'payment' | 'receipts'>('all');
  
  // Mock extended notifications for now - in real app this would come from API
  const [extendedNotifications] = useState<ExtendedNotification[]>([]);
  
  // Filter payment related notifications from context
  const paymentNotifications = contextNotifications.filter(n => 
    n.type === 'success' && n.message.toLowerCase().includes('payment')
  );

  return (
    <div>
      <div>
        <button onClick={() => setTab('all')}>All</button>
        <button onClick={() => setTab('payment')}>Payment</button>
        <button onClick={() => setTab('receipts')}>Receipts</button>
      </div>
      {tab === 'all' ? (
        <NotificationList notifications={extendedNotifications} />
      ) : tab === 'payment' ? (
        <div>
          <h3>Payment Notifications</h3>
          {paymentNotifications.length === 0 ? (
            <p>No payment notifications yet.</p>
          ) : (
            <ul>
              {paymentNotifications.map(n => (
                <li key={n.id}>
                  <strong>Payment:</strong> {n.message}
                  <span>{n.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : tab === 'receipts' && user && <PaymentReceipts userId={user.id} />}
    </div>
  );
} 