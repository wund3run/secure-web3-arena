import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, MessageSquare, AlertTriangle, CheckCircle, Eye, GitBranch } from 'lucide-react';

interface CodeAnnotation {
  id: string;
  lineNumber: number;
  type: 'comment' | 'issue' | 'suggestion' | 'approved';
  content: string;
  author: string;
  createdAt: Date;
  resolved: boolean;
}

interface CodeFile {
  name: string;
  path: string;
  content: string;
  annotations: CodeAnnotation[];
}

interface CodeReviewAnnotationToolsProps {
  auditId: string;
}

export function CodeReviewAnnotationTools({ auditId }: CodeReviewAnnotationToolsProps) {
  const [selectedFile, setSelectedFile] = useState<string>('SmartContract.sol');
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [annotationType, setAnnotationType] = useState<string>('comment');
  const [annotationContent, setAnnotationContent] = useState('');

  const codeFiles: CodeFile[] = [
    {
      name: 'SmartContract.sol',
      path: 'contracts/SmartContract.sol',
      content: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SmartContract {
    mapping(address => uint256) public balances;
    address public owner;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
    
    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }
}`,
      annotations: [
        {
          id: '1',
          lineNumber: 13,
          type: 'issue',
          content: 'Reentrancy vulnerability: External call before state update. Consider using checks-effects-interactions pattern.',
          author: 'Sarah Chen',
          createdAt: new Date(Date.now() - 86400000),
          resolved: false
        },
        {
          id: '2',
          lineNumber: 7,
          type: 'suggestion',
          content: 'Consider using Ownable from OpenZeppelin for better access control implementation.',
          author: 'Sarah Chen',
          createdAt: new Date(Date.now() - 172800000),
          resolved: true
        }
      ]
    }
  ];

  const currentFile = codeFiles.find(f => f.name === selectedFile);
  const codeLines = currentFile?.content.split('\n') || [];

  const getAnnotationIcon = (type: string) => {
    switch (type) {
      case 'issue': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'suggestion': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAnnotationColor = (type: string) => {
    switch (type) {
      case 'issue': return 'bg-red-50 border-red-200';
      case 'suggestion': return 'bg-blue-50 border-blue-200';
      case 'approved': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const addAnnotation = () => {
    if (!selectedLine || !annotationContent.trim()) return;

    const newAnnotation: CodeAnnotation = {
      id: Date.now().toString(),
      lineNumber: selectedLine,
      type: annotationType as CodeAnnotation['type'],
      content: annotationContent.trim(),
      author: 'You',
      createdAt: new Date(),
      resolved: false
    };

    // In a real implementation, this would update the backend
    console.log('Adding annotation:', newAnnotation);
    
    setAnnotationContent('');
    setSelectedLine(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Code Review & Annotation Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select value={selectedFile} onValueChange={setSelectedFile}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select file" />
              </SelectTrigger>
              <SelectContent>
                {codeFiles.map((file) => (
                  <SelectItem key={file.name} value={file.name}>
                    {file.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline" className="flex items-center gap-1">
              <GitBranch className="h-3 w-3" />
              {currentFile?.annotations.length || 0} annotations
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {codeLines.length} lines
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Code Viewer */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">{currentFile?.path}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-muted/30 h-full overflow-auto">
                <div className="font-mono text-sm">
                  {codeLines.map((line, index) => {
                    const lineNumber = index + 1;
                    const annotation = currentFile?.annotations.find(a => a.lineNumber === lineNumber);
                    const isSelected = selectedLine === lineNumber;
                    
                    return (
                      <div
                        key={lineNumber}
                        className={`flex hover:bg-muted/50 ${isSelected ? 'bg-blue-100' : ''} ${
                          annotation ? getAnnotationColor(annotation.type) : ''
                        }`}
                        onClick={() => setSelectedLine(lineNumber)}
                      >
                        <div className="w-12 px-2 py-1 text-xs text-muted-foreground text-right border-r bg-muted/50 select-none cursor-pointer">
                          {lineNumber}
                        </div>
                        <div className="flex-1 px-4 py-1 whitespace-pre-wrap">
                          {line}
                        </div>
                        {annotation && (
                          <div className="px-2 py-1 flex items-center">
                            {getAnnotationIcon(annotation.type)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Annotations Panel */}
        <div className="space-y-4">
          {/* Add Annotation */}
          {selectedLine && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">
                  Add Annotation (Line {selectedLine})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select value={annotationType} onValueChange={setAnnotationType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comment">Comment</SelectItem>
                    <SelectItem value="issue">Issue</SelectItem>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Enter your annotation..."
                  value={annotationContent}
                  onChange={(e) => setAnnotationContent(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button onClick={addAnnotation} size="sm" className="flex-1">
                    Add
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedLine(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Existing Annotations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Annotations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {currentFile?.annotations.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No annotations yet. Click on a line number to add one.
                  </p>
                ) : (
                  currentFile?.annotations.map((annotation) => (
                    <div
                      key={annotation.id}
                      className={`p-3 rounded-lg border ${getAnnotationColor(annotation.type)} ${
                        annotation.resolved ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        {getAnnotationIcon(annotation.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              Line {annotation.lineNumber}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {annotation.author}
                            </span>
                            {annotation.resolved && (
                              <Badge variant="secondary" className="text-xs">
                                Resolved
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm">{annotation.content}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
