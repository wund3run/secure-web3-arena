
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Clock, 
  Users, 
  Star, 
  CheckCircle,
  BookOpen,
  Download
} from 'lucide-react';

const TutorialDetail = () => {
  const { slug } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);

  // Mock tutorial data
  const tutorial = {
    title: 'Complete Smart Contract Security Audit Course',
    description: 'Learn end-to-end smart contract auditing with hands-on examples and real-world case studies.',
    instructor: {
      name: 'Dr. Sarah Chen',
      title: 'Senior Security Researcher',
      avatar: null
    },
    duration: 240,
    difficulty: 'intermediate',
    rating: 4.8,
    studentCount: 1247,
    completionRate: 85,
    videoUrl: 'https://example.com/video',
    chapters: [
      { id: 1, title: 'Introduction to Smart Contract Auditing', duration: 30, completed: true },
      { id: 2, title: 'Common Vulnerabilities Overview', duration: 45, completed: false },
      { id: 3, title: 'Manual Code Review Techniques', duration: 60, completed: false },
      { id: 4, title: 'Automated Testing Tools', duration: 50, completed: false },
      { id: 5, title: 'Writing Audit Reports', duration: 35, completed: false },
      { id: 6, title: 'Real-world Case Studies', duration: 20, completed: false }
    ]
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <StandardLayout
      title={tutorial.title}
      description={tutorial.description}
    >
      <div className="space-y-8">
        <Link to="/tutorials">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tutorials
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-900 rounded-t-lg flex items-center justify-center relative">
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute z-10"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8" />
                    )}
                  </Button>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Progress value={progress} className="h-1" />
                  </div>
                </div>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-2">{tutorial.title}</h1>
                  <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{tutorial.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{tutorial.instructor.name}</div>
                      <div className="text-sm text-muted-foreground">{tutorial.instructor.title}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatDuration(tutorial.duration)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {tutorial.studentCount} students
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      {tutorial.rating}
                    </span>
                    <Badge>{tutorial.difficulty}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                <div className="space-y-2">
                  {tutorial.chapters.map((chapter) => (
                    <div 
                      key={chapter.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        {chapter.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                        )}
                        <div>
                          <div className="font-medium">{chapter.title}</div>
                          <div className="text-sm text-muted-foreground">
                            Chapter {chapter.id}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDuration(chapter.duration)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    1 of {tutorial.chapters.length} chapters completed
                  </div>
                  <Button className="w-full">
                    Continue Learning
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Course Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Course Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span>{formatDuration(tutorial.duration)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty</span>
                    <Badge variant="outline">{tutorial.difficulty}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Students</span>
                    <span>{tutorial.studentCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completion Rate</span>
                    <span>{tutorial.completionRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Resources</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Course Materials
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Reading List
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Code Examples
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default TutorialDetail;
