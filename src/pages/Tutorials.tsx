

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Video, Search, PlayCircle } from 'lucide-react';

const tutorialsData = [
  {
    id: 'tut-001',
    title: 'Getting Started with Hawkly',
    description: 'Learn how to set up your account and request your first audit.',
    tags: ['Getting Started', 'Platform'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '5:32',
  },
  {
    id: 'tut-002',
    title: 'Smart Contract Security Basics',
    description: 'Understand the fundamentals of smart contract security.',
    tags: ['Smart Contract', 'Security'],
    videoUrl: 'https://www.youtube.com/embed/3fumBcKC6RE',
    duration: '8:15',
  },
  {
    id: 'tut-003',
    title: 'Using the Audit Dashboard',
    description: 'Track your audit progress and manage findings.',
    tags: ['Dashboard', 'Audit'],
    videoUrl: 'https://www.youtube.com/embed/2vjPBrBU-TM',
    duration: '6:47',
  },
];

export default function Tutorials() {
  const [search, setSearch] = useState('');
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  const filteredTutorials = tutorialsData.filter(tut =>
    tut.title.toLowerCase().includes(search.toLowerCase()) ||
    tut.description.toLowerCase().includes(search.toLowerCase()) ||
    tut.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Video className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Tutorials</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Step-by-step tutorials for security auditing and Web3 development.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tutorials..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>

          {selectedTutorial ? (
            <div className="max-w-2xl mx-auto mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedTutorial.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    {selectedTutorial.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video mb-4">
                    <iframe
                      width="100%"
                      height="315"
                      src={selectedTutorial.videoUrl}
                      title={selectedTutorial.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="mb-4 text-muted-foreground">{selectedTutorial.description}</p>
                  <Button variant="outline" onClick={() => setSelectedTutorial(null)}>
                    Back to Tutorials
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTutorials.map(tut => (
                <Card key={tut.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedTutorial(tut)}>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <PlayCircle className="h-5 w-5 text-primary" />
                      <span className="text-xs text-muted-foreground">{tut.duration}</span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{tut.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-2">{tut.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {tut.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
