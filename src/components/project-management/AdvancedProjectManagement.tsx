import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar,
  Clock,
  Users,
  Target,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  Square,
  Plus,
  Edit3,
  Trash2,
  MessageSquare,
  FileText,
  Download,
  Upload,
  Filter,
  Search,
  Settings,
  Share2,
  Copy,
  Save,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Activity,
  Award,
  Lightbulb,
  Sparkles,
  Bot,
  Cpu,
  Network,
  Database,
  Lock,
  Unlock,
  Key,
  Bug,
  AlertCircle as AlertCircleIcon,
  Info,
  HelpCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Type,
  Hash,
  DollarSign,
  Percent,
  Timer,
  History,
  Zap,
  Bell,
  Mail,
  Phone,
  Video,
  MapPin,
  Globe,
  Building,
  User,
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  Briefcase,
  Folder,
  FolderOpen,
  File,
  FilePlus,
  Image,
  Music,
  Archive,
  Inbox,
  Send,
  Reply,
  Forward,
  Flag,
  Tag,
  Bookmark,
  Heart,
  Link,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  client: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  budget: number;
  spent: number;
  team: TeamMember[];
  milestones: Milestone[];
  tasks: Task[];
  timeEntries: TimeEntry[];
  documents: Document[];
  communications: Communication[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  availability: number; // percentage
  hourlyRate: number;
  skills: string[];
  currentTasks: string[];
  totalHours: number;
  isActive: boolean;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'upcoming' | 'in-progress' | 'completed' | 'overdue';
  progress: number;
  tasks: string[];
  dependencies: string[];
  deliverables: string[];
  notifications: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  estimatedHours: number;
  actualHours: number;
  startDate: Date;
  dueDate: Date;
  milestone: string;
  dependencies: string[];
  tags: string[];
  timeEntries: TimeEntry[];
  comments: Comment[];
}

interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  isRunning: boolean;
  billable: boolean;
  rate: number;
  tags: string[];
}

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'video' | 'other';
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  url: string;
  tags: string[];
}

interface Communication {
  id: string;
  type: 'email' | 'message' | 'call' | 'meeting';
  subject: string;
  content: string;
  from: string;
  to: string[];
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  attachments: string[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  attachments: string[];
}

interface ResourceAllocation {
  id: string;
  userId: string;
  projectId: string;
  role: string;
  startDate: Date;
  endDate: Date;
  allocation: number; // percentage
  hourlyRate: number;
  skills: string[];
}

export function AdvancedProjectManagement() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [resourceAllocations, setResourceAllocations] = useState<ResourceAllocation[]>([]);
  const [activeTimeEntry, setActiveTimeEntry] = useState<TimeEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    initializeProjectManagement();
  }, []);

  const initializeProjectManagement = () => {
    // Mock projects
    const mockProjects: Project[] = [
      {
        id: 'proj-001',
        name: 'DeFi Protocol Security Audit',
        description: 'Comprehensive security audit for a new DeFi lending protocol',
        status: 'active',
        priority: 'high',
        client: 'DeFiLend Inc.',
        startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        progress: 65,
        budget: 50000,
        spent: 32500,
        team: [],
        milestones: generateMockMilestones(),
        tasks: generateMockTasks(),
        timeEntries: generateMockTimeEntries(),
        documents: generateMockDocuments(),
        communications: generateMockCommunications(),
        tags: ['defi', 'security', 'audit', 'smart-contracts'],
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      },
      {
        id: 'proj-002',
        name: 'NFT Marketplace Security Review',
        description: 'Security assessment for an upcoming NFT marketplace launch',
        status: 'planning',
        priority: 'medium',
        client: 'NFTWorld',
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        progress: 15,
        budget: 35000,
        spent: 5250,
        team: [],
        milestones: generateMockMilestones(),
        tasks: generateMockTasks(),
        timeEntries: generateMockTimeEntries(),
        documents: generateMockDocuments(),
        communications: generateMockCommunications(),
        tags: ['nft', 'marketplace', 'security', 'review'],
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      }
    ];

    // Mock team members
    const mockTeamMembers: TeamMember[] = [
      {
        id: 'user-001',
        name: 'Alice Smith',
        email: 'alice@hawkly.com',
        role: 'Senior Security Auditor',
        avatar: '/avatars/alice.jpg',
        availability: 85,
        hourlyRate: 150,
        skills: ['Solidity', 'Rust', 'Security Analysis', 'Penetration Testing'],
        currentTasks: ['task-001', 'task-002'],
        totalHours: 156,
        isActive: true
      },
      {
        id: 'user-002',
        name: 'Bob Johnson',
        email: 'bob@hawkly.com',
        role: 'Security Engineer',
        avatar: '/avatars/bob.jpg',
        availability: 90,
        hourlyRate: 120,
        skills: ['Python', 'JavaScript', 'Blockchain', 'Code Review'],
        currentTasks: ['task-003'],
        totalHours: 142,
        isActive: true
      },
      {
        id: 'user-003',
        name: 'Carol Davis',
        email: 'carol@hawkly.com',
        role: 'Junior Auditor',
        avatar: '/avatars/carol.jpg',
        availability: 75,
        hourlyRate: 80,
        skills: ['Solidity', 'Security Basics', 'Documentation'],
        currentTasks: ['task-004'],
        totalHours: 98,
        isActive: true
      }
    ];

    // Mock resource allocations
    const mockAllocations: ResourceAllocation[] = [
      {
        id: 'alloc-001',
        userId: 'user-001',
        projectId: 'proj-001',
        role: 'Lead Auditor',
        startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        allocation: 80,
        hourlyRate: 150,
        skills: ['Solidity', 'Security Analysis']
      },
      {
        id: 'alloc-002',
        userId: 'user-002',
        projectId: 'proj-001',
        role: 'Security Engineer',
        startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        allocation: 60,
        hourlyRate: 120,
        skills: ['Python', 'Code Review']
      }
    ];

    setProjects(mockProjects);
    setTeamMembers(mockTeamMembers);
    setResourceAllocations(mockAllocations);
    setSelectedProject(mockProjects[0]);
    setIsLoading(false);
  };

  const generateMockMilestones = (): Milestone[] => [
    {
      id: 'milestone-001',
      title: 'Initial Code Review',
      description: 'Complete initial code review and identify major vulnerabilities',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'completed',
      progress: 100,
      tasks: ['task-001', 'task-002'],
      dependencies: [],
      deliverables: ['Initial Audit Report', 'Vulnerability List'],
      notifications: true
    },
    {
      id: 'milestone-002',
      title: 'Deep Security Analysis',
      description: 'Perform comprehensive security analysis and penetration testing',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: 'in-progress',
      progress: 75,
      tasks: ['task-003', 'task-004'],
      dependencies: ['milestone-001'],
      deliverables: ['Security Analysis Report', 'Penetration Test Results'],
      notifications: true
    },
    {
      id: 'milestone-003',
      title: 'Final Report & Recommendations',
      description: 'Compile final audit report with detailed recommendations',
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      status: 'upcoming',
      progress: 0,
      tasks: ['task-005', 'task-006'],
      dependencies: ['milestone-002'],
      deliverables: ['Final Audit Report', 'Security Recommendations'],
      notifications: true
    }
  ];

  const generateMockTasks = (): Task[] => [
    {
      id: 'task-001',
      title: 'Review Smart Contract Architecture',
      description: 'Analyze the overall smart contract architecture for design flaws',
      status: 'completed',
      priority: 'high',
      assignee: 'user-001',
      estimatedHours: 16,
      actualHours: 18,
      startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      milestone: 'milestone-001',
      dependencies: [],
      tags: ['architecture', 'review'],
      timeEntries: [],
      comments: []
    },
    {
      id: 'task-002',
      title: 'Static Analysis with Slither',
      description: 'Run automated static analysis tools on the codebase',
      status: 'completed',
      priority: 'medium',
      assignee: 'user-002',
      estimatedHours: 8,
      actualHours: 6,
      startDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      milestone: 'milestone-001',
      dependencies: [],
      tags: ['static-analysis', 'automation'],
      timeEntries: [],
      comments: []
    },
    {
      id: 'task-003',
      title: 'Penetration Testing',
      description: 'Perform manual penetration testing on key functions',
      status: 'in-progress',
      priority: 'critical',
      assignee: 'user-001',
      estimatedHours: 24,
      actualHours: 16,
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
      milestone: 'milestone-002',
      dependencies: ['task-001'],
      tags: ['penetration-testing', 'manual'],
      timeEntries: [],
      comments: []
    }
  ];

  const generateMockTimeEntries = (): TimeEntry[] => [
    {
      id: 'time-001',
      taskId: 'task-001',
      userId: 'user-001',
      description: 'Code review and architecture analysis',
      startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
      duration: 240,
      isRunning: false,
      billable: true,
      rate: 150,
      tags: ['code-review', 'architecture']
    },
    {
      id: 'time-002',
      taskId: 'task-003',
      userId: 'user-001',
      description: 'Penetration testing on lending functions',
      startTime: new Date(),
      endTime: undefined,
      duration: 0,
      isRunning: true,
      billable: true,
      rate: 150,
      tags: ['penetration-testing', 'defi']
    }
  ];

  const generateMockDocuments = (): Document[] => [
    {
      id: 'doc-001',
      name: 'Initial Audit Report.pdf',
      type: 'pdf',
      size: 2048576,
      uploadedBy: 'user-001',
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      url: '/documents/initial-audit-report.pdf',
      tags: ['report', 'audit']
    },
    {
      id: 'doc-002',
      name: 'Vulnerability Analysis.xlsx',
      type: 'doc',
      size: 512000,
      uploadedBy: 'user-002',
      uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      url: '/documents/vulnerability-analysis.xlsx',
      tags: ['analysis', 'vulnerabilities']
    }
  ];

  const generateMockCommunications = (): Communication[] => [
    {
      id: 'comm-001',
      type: 'email',
      subject: 'Initial Findings Discussion',
      content: 'We have completed the initial code review and would like to schedule a call to discuss our findings.',
      from: 'alice@hawkly.com',
      to: ['client@defilend.com'],
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'read',
      attachments: ['doc-001']
    }
  ];

  const startTimeTracking = (taskId: string) => {
    const newTimeEntry: TimeEntry = {
      id: `time-${Date.now()}`,
      taskId,
      userId: 'user-001', // Current user
      description: '',
      startTime: new Date(),
      duration: 0,
      isRunning: true,
      billable: true,
      rate: 150,
      tags: []
    };
    setActiveTimeEntry(newTimeEntry);
    toast.success('Time tracking started');
  };

  const stopTimeTracking = () => {
    if (activeTimeEntry) {
      const updatedEntry = {
        ...activeTimeEntry,
        endTime: new Date(),
        duration: Math.floor((Date.now() - activeTimeEntry.startTime.getTime()) / (1000 * 60)),
        isRunning: false
      };
      setActiveTimeEntry(null);
      toast.success(`Time tracking stopped. Duration: ${updatedEntry.duration} minutes`);
    }
  };

  const updateMilestoneStatus = (milestoneId: string, status: Milestone['status']) => {
    if (!selectedProject) return;
    
    setSelectedProject(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        milestones: prev.milestones.map(milestone =>
          milestone.id === milestoneId
            ? { ...milestone, status, updatedAt: new Date() }
            : milestone
        )
      };
    });
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    if (!selectedProject) return;
    
    setSelectedProject(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        tasks: prev.tasks.map(task =>
          task.id === taskId
            ? { ...task, status, updatedAt: new Date() }
            : task
        )
      };
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'in-progress': return 'text-orange-600 bg-orange-100';
      case 'planning': return 'text-purple-600 bg-purple-100';
      case 'on-hold': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'upcoming': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Calendar className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <h3 className="text-lg font-semibold mb-2">Loading Project Management</h3>
          <p className="text-muted-foreground">Initializing project data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Advanced Project Management</h1>
              <p className="text-muted-foreground">Comprehensive project tracking, resource allocation, and time management</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="time-tracking">Time Tracking</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Briefcase className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{projects.length}</div>
                    <div className="text-sm text-muted-foreground">Active Projects</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{teamMembers.length}</div>
                    <div className="text-sm text-muted-foreground">Team Members</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {activeTimeEntry ? 'Active' : '0'}
                    </div>
                    <div className="text-sm text-muted-foreground">Time Tracking</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {selectedProject?.milestones.filter(m => m.status === 'completed').length || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Completed Milestones</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{project.name}</span>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{project.progress}% complete</span>
                          <span>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedProject?.milestones
                      .filter(m => m.status === 'upcoming' || m.status === 'in-progress')
                      .slice(0, 3)
                      .map((milestone) => (
                        <div key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{milestone.title}</div>
                            <div className="text-sm text-muted-foreground">
                              Due: {milestone.dueDate.toLocaleDateString()}
                            </div>
                          </div>
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card 
                  key={project.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                      </div>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Client: {project.client}</span>
                        <span>{project.team.length} members</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span>Budget: ${project.budget.toLocaleString()}</span>
                        <span>Spent: ${project.spent.toLocaleString()}</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-6">
            {selectedProject && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Milestones - {selectedProject.name}</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Milestone
                  </Button>
                </div>

                <div className="space-y-4">
                  {selectedProject.milestones.map((milestone) => (
                    <Card key={milestone.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{milestone.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(milestone.status)}>
                              {milestone.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{milestone.progress}%</span>
                            </div>
                            <Progress value={milestone.progress} className="h-2" />
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Due: {milestone.dueDate.toLocaleDateString()}</span>
                            <span>{milestone.tasks.length} tasks</span>
                          </div>

                          <div className="flex space-x-2">
                            {(['upcoming', 'in-progress', 'completed'] as const).map((status) => (
                              <Button
                                key={status}
                                size="sm"
                                variant={milestone.status === status ? "default" : "outline"}
                                onClick={() => updateMilestoneStatus(milestone.id, status)}
                              >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Resource Allocation</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Allocate Resource
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{member.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.role}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{member.availability}% available</div>
                          <div className="text-sm text-muted-foreground">${member.hourlyRate}/hr</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Allocations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resourceAllocations.map((allocation) => {
                      const member = teamMembers.find(m => m.id === allocation.userId);
                      const project = projects.find(p => p.id === allocation.projectId);
                      
                      return (
                        <div key={allocation.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">{member?.name}</div>
                            <Badge>{allocation.role}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {project?.name} - {allocation.allocation}% allocation
                          </div>
                          <Progress value={allocation.allocation} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="time-tracking" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Time Tracking</h3>
              {activeTimeEntry ? (
                <Button onClick={stopTimeTracking} variant="error">
                  <Square className="h-4 w-4 mr-2" />
                  Stop Tracking
                </Button>
              ) : (
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Start Tracking
                </Button>
              )}
            </div>

            {activeTimeEntry && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      Time Tracking Active
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Task: {selectedProject?.tasks.find(t => t.id === activeTimeEntry.taskId)?.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Started: {activeTimeEntry.startTime.toLocaleTimeString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Time Entries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedProject?.timeEntries.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">
                            {selectedProject.tasks.find(t => t.id === entry.taskId)?.title}
                          </div>
                          <div className="text-sm text-muted-foreground">{entry.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{entry.duration} min</div>
                          <div className="text-sm text-muted-foreground">
                            ${entry.rate * (entry.duration / 60)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {selectedProject?.timeEntries.reduce((sum, entry) => sum + entry.duration, 0) || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Minutes</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          ${selectedProject?.timeEntries.reduce((sum, entry) => sum + (entry.rate * entry.duration / 60), 0).toFixed(2) || 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Billed</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Client Communications</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Communications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedProject?.communications.map((comm) => (
                        <div key={comm.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-medium">{comm.subject}</div>
                              <div className="text-sm text-muted-foreground">
                                {comm.from} → {comm.to.join(', ')}
                              </div>
                            </div>
                            <Badge variant="outline">{comm.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{comm.content}</p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{comm.timestamp.toLocaleString()}</span>
                            <span>{comm.attachments.length} attachments</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Schedule Call
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Video className="h-4 w-4 mr-2" />
                      Video Meeting
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Share Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 