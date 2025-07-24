import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Send, 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Zap,
  Target,
  Clock,
  FileText,
  Download,
  Copy,
  Play,
  Loader2,
  Eye,
  Settings,
  TrendingUp,
  Activity,
  Users,
  Globe,
  Code,
  Shield,
  Lightbulb,
  History,
  Star,
  Filter,
  Search,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share,
  Bookmark,
  Archive,
  RefreshCw,
  Sparkles,
  Target as TargetIcon,
  BarChart3,
  PieChart
} from 'lucide-react';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system' | 'vulnerability' | 'suggestion';
  content: string;
  timestamp: Date;
  metadata?: {
    confidence?: number;
    severity?: string;
    category?: string;
    codeSnippet?: string;
    recommendation?: string;
    automated?: boolean;
  };
  reactions?: string[];
  isTyping?: boolean;
}

interface AuditSession {
  id: string;
  name: string;
  project: string;
  status: 'active' | 'paused' | 'completed';
  participants: string[];
  startTime: Date;
  lastActivity: Date;
  totalMessages: number;
  vulnerabilitiesFound: number;
  aiSuggestions: number;
}

interface VulnerabilityInsight {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  codeSnippet: string;
  recommendation: string;
  confidence: number;
  automated: boolean;
  timestamp: Date;
  language: string;
  framework?: string;
}

export function AIAuditAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeSession, setActiveSession] = useState<AuditSession | null>(null);
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityInsight[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('solidity');
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supportedLanguages = [
    { id: 'solidity', name: 'Solidity', icon: '🔵' },
    { id: 'vyper', name: 'Vyper', icon: '🟣' },
    { id: 'rust', name: 'Rust', icon: '🟠' },
    { id: 'typescript', name: 'TypeScript', icon: '🔵' },
    { id: 'python', name: 'Python', icon: '🟡' },
    { id: 'go', name: 'Go', icon: '🔵' }
  ];

  useEffect(() => {
    initializeSession();
    generateSampleData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeSession = () => {
    const session: AuditSession = {
      id: 'session-1',
      name: 'DeFi Protocol Security Audit',
      project: 'Uniswap V4 Integration',
      status: 'active',
      participants: ['Dr. Sarah Chen', 'Marcus Rodriguez', 'AI Assistant'],
      startTime: new Date(),
      lastActivity: new Date(),
      totalMessages: 0,
      vulnerabilitiesFound: 0,
      aiSuggestions: 0
    };
    setActiveSession(session);
  };

  const generateSampleData = () => {
    const sampleMessages: ChatMessage[] = [
      {
        id: '1',
        type: 'assistant',
        content: 'Hello! I\'m your AI audit assistant. I can help you analyze smart contracts, detect vulnerabilities, and provide security recommendations. What would you like to audit today?',
        timestamp: new Date(Date.now() - 300000),
        metadata: {
          automated: true
        }
      },
      {
        id: '2',
        type: 'user',
        content: 'I need to audit a DeFi lending protocol. Can you help me identify potential security issues?',
        timestamp: new Date(Date.now() - 240000)
      },
      {
        id: '3',
        type: 'assistant',
        content: 'Absolutely! I can help you audit DeFi lending protocols. I\'ll analyze the smart contracts for common vulnerabilities like reentrancy attacks, flash loan exploits, and oracle manipulation. Please share the contract code or specific functions you\'d like me to examine.',
        timestamp: new Date(Date.now() - 180000),
        metadata: {
          automated: true
        }
      }
    ];

    const sampleVulnerabilities: VulnerabilityInsight[] = [
      {
        id: '1',
        type: 'reentrancy',
        severity: 'critical',
        title: 'Reentrancy Vulnerability in Withdraw Function',
        description: 'The withdraw function updates state after external call, allowing reentrancy attacks.',
        codeSnippet: `function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    balances[msg.sender] -= amount; // State updated after external call
}`,
        recommendation: 'Implement checks-effects-interactions pattern. Update state before external calls.',
        confidence: 95,
        automated: true,
        timestamp: new Date(),
        language: 'solidity'
      },
      {
        id: '2',
        type: 'flash_loan',
        severity: 'high',
        title: 'Flash Loan Attack Vector',
        description: 'Lending protocol lacks proper flash loan protection mechanisms.',
        codeSnippet: `function borrow(uint256 amount) external {
    // No flash loan protection
    require(getCollateralRatio(msg.sender) >= minCollateralRatio, "Insufficient collateral");
    token.transfer(msg.sender, amount);
}`,
        recommendation: 'Implement flash loan detection and protection mechanisms.',
        confidence: 88,
        automated: true,
        timestamp: new Date(),
        language: 'solidity'
      }
    ];

    setMessages(sampleMessages);
    setVulnerabilities(sampleVulnerabilities);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        metadata: {
          automated: true
        }
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // Check for vulnerabilities in the message
      if (inputMessage.toLowerCase().includes('code') || inputMessage.toLowerCase().includes('contract')) {
        analyzeForVulnerabilities(inputMessage);
      }
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "I've analyzed your code and identified several potential security concerns. Let me break them down for you...",
      "Based on the smart contract patterns you've described, I recommend implementing additional security measures...",
      "I can help you with that! Here are some best practices for secure smart contract development...",
      "Let me examine the vulnerability you mentioned. This appears to be a common issue in DeFi protocols...",
      "I've detected a potential security flaw. Here's my analysis and recommended fixes..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const analyzeForVulnerabilities = (code: string) => {
    // Simulate vulnerability detection
    setTimeout(() => {
      const newVulnerability: VulnerabilityInsight = {
        id: Date.now().toString(),
        type: 'access_control',
        severity: 'medium',
        title: 'Access Control Issue Detected',
        description: 'Function lacks proper access control mechanisms.',
        codeSnippet: code,
        recommendation: 'Implement access control using OpenZeppelin AccessControl or custom modifiers.',
        confidence: 82,
        automated: true,
        timestamp: new Date(),
        language: selectedLanguage
      };

      setVulnerabilities(prev => [newVulnerability, ...prev]);
      
      const vulnerabilityMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: 'vulnerability',
        content: `🚨 Security Alert: ${newVulnerability.title}`,
        timestamp: new Date(),
        metadata: {
          severity: newVulnerability.severity,
          category: newVulnerability.type,
          confidence: newVulnerability.confidence
        }
      };

      setMessages(prev => [...prev, vulnerabilityMessage]);
      toast.success('New vulnerability detected!');
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredVulnerabilities = vulnerabilities.filter(vuln => {
    const matchesSearch = vuln.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vuln.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || vuln.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Audit Assistant</h1>
            <p className="text-muted-foreground">
              {activeSession?.name} • {activeSession?.participants.length} participants
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={selectedLanguage} 
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {supportedLanguages.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.icon} {lang.name}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm" onClick={() => setIsRecording(!isRecording)}>
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsVideoEnabled(!isVideoEnabled)}>
              {isVideoEnabled ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat ({messages.length})
            </TabsTrigger>
            <TabsTrigger value="vulnerabilities" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Vulnerabilities ({vulnerabilities.length})
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-muted'} rounded-lg p-3`}>
                    <div className="flex items-start gap-2">
                      {message.type === 'assistant' && <Brain className="h-4 w-4 mt-1" />}
                      {message.type === 'vulnerability' && <AlertTriangle className="h-4 w-4 mt-1" />}
                      {message.type === 'system' && <Shield className="h-4 w-4 mt-1" />}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        {message.metadata && (
                          <div className="mt-2 space-y-1">
                            {message.metadata.severity && (
                              <Badge className={getSeverityColor(message.metadata.severity)}>
                                {message.metadata.severity}
                              </Badge>
                            )}
                            {message.metadata.confidence && (
                              <p className="text-xs opacity-75">
                                Confidence: {message.metadata.confidence}%
                              </p>
                            )}
                          </div>
                        )}
                        <p className="text-xs opacity-75 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 animate-pulse" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask me about smart contract security, vulnerabilities, or paste code for analysis..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  className="flex-1 min-h-[60px] max-h-[120px]"
                />
                <Button onClick={sendMessage} disabled={!inputMessage.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="flex-1 p-4">
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search vulnerabilities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Vulnerability List */}
              <div className="space-y-4">
                {filteredVulnerabilities.map((vulnerability) => (
                  <Card key={vulnerability.id} className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <div>
                            <h4 className="font-medium">{vulnerability.title}</h4>
                            <p className="text-sm text-muted-foreground capitalize">{vulnerability.type} vulnerability</p>
                          </div>
                        </div>
                        <Badge className={getSeverityColor(vulnerability.severity)}>
                          {vulnerability.severity}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {vulnerability.description}
                      </p>

                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-medium">Code Snippet</h5>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(vulnerability.codeSnippet)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                          <code>{vulnerability.codeSnippet}</code>
                        </pre>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-sm font-medium mb-1">Recommendation</h5>
                        <p className="text-sm">{vulnerability.recommendation}</p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span>Confidence: {vulnerability.confidence}%</span>
                          <span>{vulnerability.automated ? 'Automated' : 'Manual'}</span>
                          <span>Language: {vulnerability.language}</span>
                        </div>
                        <span>{vulnerability.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                      <h4 className="font-medium text-blue-800">Pattern Recognition</h4>
                      <p className="text-sm text-blue-700">
                        I've identified common security patterns in your codebase that could be optimized.
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <h4 className="font-medium text-green-800">Best Practices</h4>
                      <p className="text-sm text-green-700">
                        Your implementation follows most security best practices. Consider adding additional validation layers.
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <h4 className="font-medium text-yellow-800">Recommendations</h4>
                      <p className="text-sm text-yellow-700">
                        Implement formal verification for critical functions to ensure mathematical correctness.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TargetIcon className="h-5 w-5" />
                    Security Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">87/100</div>
                    <p className="text-sm text-muted-foreground mb-4">Overall Security Score</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Access Control</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Input Validation</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>State Management</span>
                        <span>78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <h4 className="font-medium">Vulnerabilities Found</h4>
                    <p className="text-2xl font-bold text-red-500">{vulnerabilities.length}</p>
                    <p className="text-xs text-muted-foreground">
                      {vulnerabilities.filter(v => v.severity === 'critical').length} critical
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <MessageSquare className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-medium">Messages</h4>
                    <p className="text-2xl font-bold text-blue-500">{messages.length}</p>
                    <p className="text-xs text-muted-foreground">
                      {messages.filter(m => m.type === 'assistant').length} AI responses
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <h4 className="font-medium">AI Accuracy</h4>
                    <p className="text-2xl font-bold text-purple-500">94%</p>
                    <p className="text-xs text-muted-foreground">
                      Based on {vulnerabilities.length} detections
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Session Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Session Duration</span>
                    <span>2 hours 15 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Participants</span>
                    <span>{activeSession?.participants.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Response Time</span>
                    <span>1.2 seconds average</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Code Analysis Requests</span>
                    <span>{messages.filter(m => m.content.toLowerCase().includes('code')).length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AIAuditAssistant; 