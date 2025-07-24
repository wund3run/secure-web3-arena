import { useState } from 'react';
import PaymentReceipts from './PaymentReceipts';

const [tab, setTab] = useState<'all' | 'payment' | 'receipts'>('all');
const paymentNotifications = notifications.filter(n => n.type === 'payment');

<div>
  <button onClick={() => setTab('all')}>All</button>
  <button onClick={() => setTab('payment')}>Payment</button>
  <button onClick={() => setTab('receipts')}>Receipts</button>
</div>
{tab === 'all' ? (
  <NotificationList notifications={notifications} />
) : tab === 'payment' ? (
  <div>
    <h3>Payment Notifications</h3>
    {paymentNotifications.length === 0 ? (
      <p>No payment notifications yet.</p>
    ) : (
      <ul>
        {paymentNotifications.map(n => (
          <li key={n.id}>
            <strong>{n.title}</strong>: {n.message}
            <span>{formatDate(n.created_at)}</span>
            {n.metadata?.audit_request_id && (
              <a href={`/audit/${n.metadata.audit_request_id}`}>View Audit</a>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
) : tab === 'receipts' && user && <PaymentReceipts userId={user.id} />} 