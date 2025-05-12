
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Mock data for demonstration
const mockAuditData = {
  id: 'audit-123',
  name: 'DeFi Protocol Security Audit',
  status: 'in-progress',
  progress: 60,
  startDate: '2023-05-15',
  dueDate: '2023-06-10',
  client: {
    name: 'DeFi Innovations Inc.',
    logo: ''
  },
  description: 'Comprehensive security audit of smart contract ecosystem for DeFi lending protocol',
  securityScore: 76,
  riskCategories: [
    { name: 'Access Controls', score: 85, maxScore: 100, riskLevel: 'low', description: 'Good access control implementation with minor improvements needed' },
    { name: 'Smart Contract Logic', score: 62, maxScore: 100, riskLevel: 'medium', description: 'Several logic issues found that require attention' },
    { name: 'Oracle Integration', score: 45, maxScore: 100, riskLevel: 'high', description: 'Critical vulnerabilities in price feed implementations' },
    { name: 'Gas Optimization', score: 90, maxScore: 100, riskLevel: 'low', description: 'Efficient gas usage with minor optimization opportunities' }
  ],
  vulnerabilities: [
    { name: 'Reentrancy', count: 2, severity: 'critical' },
    { name: 'Access Control', count: 3, severity: 'high' },
    { name: 'Input Validation', count: 5, severity: 'medium' },
    { name: 'Oracle Manipulation', count: 1, severity: 'high' },
    { name: 'Front-Running', count: 2, severity: 'medium' },
    { name: 'Integer Overflow', count: 0, severity: 'low' },
    { name: 'Gas Optimization', count: 7, severity: 'info' }
  ],
  learningResources: [
    {
      title: 'Understanding Reentrancy Attacks',
      description: 'Learn about reentrancy vulnerabilities and how to prevent them in your smart contracts',
      type: 'article',
      url: '#',
      readingTime: '5 min',
      level: 'intermediate'
    },
    {
      title: 'Best Practices for Oracle Integration',
      description: 'A comprehensive guide to securely integrating price oracles in DeFi applications',
      type: 'guide',
      url: '#',
      readingTime: '12 min',
      level: 'advanced'
    }
  ],
  messages: [
    {
      id: 'm1',
      sender: {
        id: 'auditor1',
        name: 'Alex Chen',
        avatar: '',
        role: 'auditor'
      },
      content: "I've completed the initial analysis of your lending pool contract. I found a potential reentrancy vulnerability in the withdraw function.",
      timestamp: '10:30 AM',
      status: 'read'
    },
    {
      id: 'm2',
      sender: {
        id: 'client1',
        name: 'Sarah Kim',
        avatar: '',
        role: 'client'
      },
      content: "Thanks for the update. Can you provide more details about this vulnerability?",
      timestamp: '10:45 AM',
      status: 'read'
    },
    {
      id: 'm3',
      sender: {
        id: 'system',
        name: 'System',
        role: 'system'
      },
      content: "Alex Chen has shared a code snippet",
      timestamp: '11:02 AM'
    },
    {
      id: 'm4',
      sender: {
        id: 'auditor1',
        name: 'Alex Chen',
        avatar: '',
        role: 'auditor'
      },
      content: "Here's the vulnerable code section. The issue is that the contract updates the user's balance after sending ETH, which could allow an attacker to call back into the withdraw function before the balance is updated.",
      timestamp: '11:02 AM',
      attachments: [
        {
          name: 'vulnerable-code.sol',
          url: '#',
          type: 'code',
          size: '4.2 KB'
        }
      ],
      status: 'read'
    }
  ],
  participants: [
    {
      id: 'auditor1',
      name: 'Alex Chen',
      avatar: '',
      role: 'Lead Auditor',
      status: 'online'
    },
    {
      id: 'auditor2',
      name: 'Maria Garcia',
      avatar: '',
      role: 'Security Researcher',
      status: 'away'
    },
    {
      id: 'client1',
      name: 'Sarah Kim',
      avatar: '',
      role: 'Project Manager',
      status: 'online'
    },
    {
      id: 'client2',
      name: 'Jason Wei',
      avatar: '',
      role: 'Lead Developer',
      status: 'offline'
    }
  ]
};

export const useAuditDetails = (auditId: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true);
  const [auditData, setAuditData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchAuditData = async () => {
      setIsLoading(true);
      try {
        // In a real app, fetch from API: await api.getAuditDetails(auditId);
        setTimeout(() => {
          setAuditData(mockAuditData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching audit data:", error);
        toast.error("Failed to load audit details");
        setIsLoading(false);
      }
    };
    
    fetchAuditData();
  }, [auditId]);

  const handleSendMessage = (message: string) => {
    toast.success("Message sent successfully");
    // In a real app, send to API and update state
    console.log("Sending message:", message);
  };

  return {
    isLoading,
    auditData,
    activeTab,
    setActiveTab,
    handleSendMessage
  };
};
