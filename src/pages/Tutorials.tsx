
import React, { useState } from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

import { TutorialsHeader } from './tutorials/TutorialsHeader';
import { TutorialCard } from './tutorials/TutorialCard';
import { LearningPathCard } from './tutorials/LearningPathCard';
import { QuickTutorialCard } from './tutorials/QuickTutorialCard';
import { CategoryCard } from './tutorials/CategoryCard';
import { 
  featuredTutorials, 
  learningPaths, 
  quickTutorials, 
  categories 
} from './tutorials/tutorial-data';

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [completedTutorials, setCompletedTutorials] = useState<number[]>([]);

  const markComplete = (tutorialIndex: number) => {
    if (!completedTutorials.includes(tutorialIndex)) {
      setCompletedTutorials([...completedTutorials, tutorialIndex]);
    }
  };

  return (
    <ContentPage
      title="Security Tutorials"
      description="Comprehensive video tutorials, interactive labs, and hands-on guides for mastering Web3 security auditing and AI-powered vulnerability detection."
    >
      <div className="space-y-8">
        <TutorialsHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <Tabs defaultValue="featured" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="quick-tutorials">Quick Start</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {featuredTutorials.map((tutorial, index) => (
                <TutorialCard
                  key={index}
                  tutorial={tutorial}
                  index={index}
                  completedTutorials={completedTutorials}
                  onMarkComplete={markComplete}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="learning-paths" className="space-y-6">
            <div className="grid md:grid-cols-1 gap-6">
              {learningPaths.map((path, index) => (
                <LearningPathCard key={index} path={path} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick-tutorials" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickTutorials.map((tutorial, index) => (
                <QuickTutorialCard key={index} tutorial={tutorial} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.name} category={category} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Progress Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Your Learning Progress</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{completedTutorials.length}</div>
              <div className="text-sm text-muted-foreground">Tutorials Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((completedTutorials.length / featuredTutorials.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Featured Tutorials</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-muted-foreground">Certificates Earned</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Become a Security Expert?</h2>
          <p className="text-muted-foreground mb-6">
            Join our comprehensive training programs and earn industry-recognized certifications 
            in Web3 security and AI-powered auditing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth">
                Start Free Trial
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Syllabus
            </Button>
          </div>
        </div>
      </div>
    </ContentPage>
  );
};

export default Tutorials;
