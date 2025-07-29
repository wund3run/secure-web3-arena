import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Award, 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText, 
  Download,
  Play,
  CheckCircle
} from 'lucide-react';
import type { Certification } from './types';
import { getStatusColor, getLevelColor, formatCurrency, formatDuration } from './utils';

interface CertificationCardProps {
  certification: Certification;
  onStart: (id: string) => void;
  onDownload: (id: string) => void;
}

export function CertificationCard({ certification, onStart, onDownload }: CertificationCardProps) {
  const isCompleted = certification.status === 'completed';
  const isInProgress = certification.status === 'in-progress';

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Award className="h-6 w-6 text-blue-600" />
            <div>
              <CardTitle className="text-lg">{certification.name}</CardTitle>
              <p className="text-sm text-gray-600">{certification.issuer}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Badge className={getLevelColor(certification.level)}>
              {certification.level}
            </Badge>
            <Badge className={getStatusColor(certification.status)}>
              {certification.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-700 mb-4">{certification.description}</p>
        
        {isInProgress && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{certification.progress}%</span>
            </div>
            <Progress value={certification.progress} className="h-2" />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{formatDuration(certification.examDetails.duration)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-gray-500" />
            <span>{certification.examDetails.questions} questions</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span>{formatCurrency(certification.examDetails.cost)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{certification.examDetails.format}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {!isCompleted && (
            <Button 
              onClick={() => onStart(certification.id)}
              className="flex-1"
              variant={isInProgress ? "outline" : "default"}
            >
              {isInProgress ? (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Continue
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </>
              )}
            </Button>
          )}
          
          {isCompleted && (
            <Button 
              onClick={() => onDownload(certification.id)}
              className="flex-1"
              variant="outline"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
          )}
        </div>
        
        {isCompleted && certification.issueDate && (
          <div className="mt-3 flex items-center text-sm text-green-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            Completed on {certification.issueDate.toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 