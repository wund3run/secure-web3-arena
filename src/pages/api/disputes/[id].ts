import type { NextApiRequest, NextApiResponse } from 'next';
import { DisputeService } from '../../../services/disputeService';
import { NotificationService } from '../../../services/notificationService';
import { getProjectNameAndUsers } from '../../../services/disputeService'; // Placeholder for helper
import { emailReceipt } from '../../../services/receiptService'; // For possible receipt integration

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = (req as any).user;
    if (!user || !user.isAdmin) return res.status(403).json({ error: 'Forbidden' });

    if (req.method === 'PATCH') {
      const { id } = req.query;
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Missing dispute id' });
      }
      const { status, resolution_notes } = req.body;
      if (!status) {
        return res.status(400).json({ error: 'Missing status' });
      }
      const dispute = await DisputeService.updateDisputeStatus({
        id,
        status,
        resolution_notes,
      });
      // Trigger notification for both parties
      const { projectName, raised_by, against } = await getProjectNameAndUsers(id); // Placeholder
      await NotificationService.sendDisputeStatusChangedNotification(against, projectName, status);
      if (against !== raised_by) {
        await NotificationService.sendDisputeStatusChangedNotification(raised_by, projectName, status);
      }
      // If resolved and refund/payment required, trigger receipt logic (stub)
      if (status === 'resolved') {
        // For demo: generate and email a receipt to both parties
        // In real logic, determine which user(s) should receive the receipt and what receiptId to use
        // Here, just call with placeholders
        // await generateReceiptPDF('receiptId');
        // await emailReceipt('receiptId', 'user1@example.com');
      }
      return res.status(200).json(dispute);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
} 