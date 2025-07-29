import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Menu, 
  Code, 
  Shield, 
  FileText, 
  MessageSquare, 
  Settings,
  Search,
  Filter,
  Download,
  Share,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  Check,
  X,
  AlertTriangle,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuditItem {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'needs-review';
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'vulnerability' | 'gas-optimization' | 'logic-review' | 'security-check';
  description: string;
  file?: string;
  line?: number;
}

interface MobileAuditorWorkspaceProps {
  auditItems: AuditItem[];
  onItemUpdate: (id: string, status: AuditItem['status']) => void;
  onItemSelect: (item: AuditItem) => void;
  className?: string;
}

export function MobileAuditorWorkspace({
  auditItems,
  onItemUpdate,
  onItemSelect,
  className
}: MobileAuditorWorkspaceProps) {
  const [activeTab, setActiveTab] = useState('checklist');
  const [selectedItem, setSelectedItem] = useState<AuditItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const filteredItems = auditItems.filter(item => 
    filter === 'all' || item.status === filter
  );

  const getStatusColor = (status: AuditItem['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'needs-review': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: AuditItem['priority']) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeIcon = (type: AuditItem['type']) => {
    switch (type) {
      case 'vulnerability': return <AlertTriangle className="h-4 w-4" />;
      case 'gas-optimization': return <RotateCcw className="h-4 w-4" />;
      case 'logic-review': return <Code className="h-4 w-4" />;
      case 'security-check': return <Shield className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const toggleItemExpansion = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleStatusChange = (item: AuditItem, newStatus: AuditItem['status']) => {
    onItemUpdate(item.id, newStatus);
  };

  return (
    <div className={cn("h-screen flex flex-col bg-gray-50", className)}>
      {/* Mobile Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <div className="space-y-4 mt-6">
              <h3 className="font-semibold">Audit Tools</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Code className="h-4 w-4 mr-2" />
                  Code Review
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Scan
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Client Chat
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="font-semibold text-lg">Audit Workspace</h1>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b px-4 py-2">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {(['all', 'pending', 'in-progress', 'completed'] as const).map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterOption)}
              className="whitespace-nowrap"
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1).replace('-', ' ')}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-white border-b">
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
            <TabsTrigger value="code">Code Review</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-3">
                {filteredItems.map((item) => (
                  <Card 
                    key={item.id} 
                    className="touch-manipulation"
                    onClick={() => toggleItemExpansion(item.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(item.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-sm truncate pr-2">
                              {item.title}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Badge 
                                variant="secondary" 
                                className={cn("text-xs", getPriorityColor(item.priority))}
                              >
                                {item.priority}
                              </Badge>
                              <div 
                                className={cn(
                                  "w-3 h-3 rounded-full",
                                  getStatusColor(item.status)
                                )}
                              />
                            </div>
                          </div>

                          {expandedItems.has(item.id) && (
                            <div className="space-y-3">
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                              
                              {item.file && (
                                <div className="text-xs text-gray-500">
                                  📁 {item.file}
                                  {item.line && ` (Line ${item.line})`}
                                </div>
                              )}

                              {/* Touch-friendly action buttons */}
                              <div className="flex space-x-2 pt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(item, 'in-progress');
                                  }}
                                  disabled={item.status === 'in-progress'}
                                  className="flex-1"
                                >
                                  <Play className="h-3 w-3 mr-1" />
                                  Start
                                </Button>
                                
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusChange(item, 'completed');
                                  }}
                                  disabled={item.status === 'completed'}
                                  className="flex-1"
                                >
                                  <Check className="h-3 w-3 mr-1" />
                                  Complete
                                </Button>
                                
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onItemSelect(item);
                                  }}
                                  className="flex-1"
                                >
                                  <Code className="h-3 w-3 mr-1" />
                                  Review
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex-shrink-0">
                          {expandedItems.has(item.id) ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="code" className="flex-1 overflow-hidden">
            <div className="h-full bg-gray-900 text-green-400 font-mono text-sm">
              <div className="p-4 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">contract.sol</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="text-gray-300">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-300">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <ScrollArea className="h-full">
                <div className="p-4 space-y-1">
                  {/* Mock code lines */}
                  <div className="flex">
                    <span className="text-gray-500 w-8 text-right mr-4">1</span>
                    <span>pragma solidity ^0.8.0;</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-8 text-right mr-4">2</span>
                    <span></span>
                  </div>
                  <div className="flex bg-red-900/20 border-l-2 border-red-500">
                    <span className="text-gray-500 w-8 text-right mr-4">3</span>
                    <span className="text-red-400">contract VulnerableContract {'{'}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-8 text-right mr-4">4</span>
                    <span className="ml-4">mapping(address =&gt; uint256) public balances;</span>
                  </div>
                  <div className="flex bg-yellow-900/20 border-l-2 border-yellow-500">
                    <span className="text-gray-500 w-8 text-right mr-4">5</span>
                    <span className="ml-4 text-yellow-400">// TODO: Add access control</span>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="report" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Audit Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">3</div>
                        <div className="text-sm text-gray-600">Critical</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">7</div>
                        <div className="text-sm text-gray-600">Medium</div>
                      </div>
                    </div>
                    
                    <Button className="w-full" size="lg">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Full Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Findings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {filteredItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                        {getTypeIcon(item.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.file}</p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", getPriorityColor(item.priority))}
                        >
                          {item.priority}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white border-t p-4">
        <div className="flex space-x-2">
          <Button className="flex-1" size="lg">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Client
          </Button>
          <Button variant="outline" className="flex-1" size="lg">
            <FileText className="h-4 w-4 mr-2" />
            Save Progress
          </Button>
        </div>
      </div>
    </div>
  );
} 