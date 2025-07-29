import type { NextApiRequest, NextApiResponse } from 'next';
import { DisputeService } from '../../../services/disputeService';
import { NotificationService } from '../../../services/notificationService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Assume user is attached to req (e.g., via middleware)
    const user = (req as any).user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    if (req.method === 'POST') {
      const { project_id, against, type, description } = req.body;
      if (!project_id || !against || !type || !description) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const dispute = await DisputeService.createDispute({
        project_id,
        raised_by: user.id,
        against,
        type,
        description,
      });
      // Trigger notification for both parties
      const projectName = await getProjectName(project_id); // Placeholder, implement as needed
      await NotificationService.sendDisputeCreatedNotification(against, projectName, type);
      if (against !== user.id) {
        await NotificationService.sendDisputeCreatedNotification(user.id, projectName, type);
      }
      return res.status(201).json(dispute);
    }

    if (req.method === 'GET') {
      const { projectId } = req.query;
      if (!projectId || typeof projectId !== 'string') {
        return res.status(400).json({ error: 'Missing projectId' });
      }
      const disputes = await DisputeService.getDisputesByProject(projectId);
      return res.status(200).json(disputes);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

// Helper placeholder
async function getProjectName(project_id: string): Promise<string> {
  // TODO: Implement actual project name lookup
  return 'Project';
} 