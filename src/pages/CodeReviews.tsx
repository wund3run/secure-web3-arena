import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Eye, GitBranch, Users, FileText, Zap } from 'lucide-react';
import { HawklyCard, SecurityBadge, ProgressIndicator } from '@/components/ui/hawkly-components';

export default function CodeReviews() {
  return (
    <div className="min-h-screen bg-[#0a0d16]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e2332]/60 to-[#0a0d16] py-20">
        <div className="container mx-auto px-4 text-center">
          <SecurityBadge level="advanced" verified={true} size="lg" className="mb-6 inline-block" />
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Professional Code Reviews
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Get expert feedback on your code quality, architecture, and best practices 
            from experienced Web3 developers and security professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 border-none">
              <Link to="/request-audit">
                Request Code Review
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-blue-400 text-blue-400 hover:bg-blue-400/10">
              <Link to="/marketplace">Find Reviewers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Code Review Services</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive code analysis tailored to your project needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <HawklyCard variant="glass" elevation="subtle" glow={true} interactive={true} className="group">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-blue-700/30 transition-all">
                  <Eye className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Security-Focused Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  In-depth security analysis identifying potential vulnerabilities 
                  and attack vectors in your smart contracts.
                </p>
                <ul className="text-sm space-y-2 text-gray-400">
                  <li>• Reentrancy protection</li>
                  <li>• Access control validation</li>
                  <li>• Integer overflow checks</li>
                  <li>• Gas optimization</li>
                </ul>
              </CardContent>
            </HawklyCard>
            
            <HawklyCard variant="glass" elevation="subtle" glow={true} interactive={true} className="group">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-blue-700/30 transition-all">
                  <GitBranch className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Architecture Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Comprehensive evaluation of your project's structure, 
                  design patterns, and scalability considerations.
                </p>
                <ul className="text-sm space-y-2 text-gray-400">
                  <li>• Design pattern analysis</li>
                  <li>• Code organization</li>
                  <li>• Modularity assessment</li>
                  <li>• Upgrade patterns</li>
                </ul>
              </CardContent>
            </HawklyCard>
            
            <HawklyCard variant="glass" elevation="subtle" glow={true} interactive={true} className="group">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-blue-700/30 transition-all">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Performance Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Optimization-focused analysis to improve gas efficiency 
                  and overall contract performance.
                </p>
                <ul className="text-sm space-y-2 text-gray-400">
                  <li>• Gas optimization</li>
                  <li>• Storage efficiency</li>
                  <li>• Function optimization</li>
                  <li>• Deployment costs</li>
                </ul>
              </CardContent>
            </HawklyCard>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#0d1117]/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Review Process</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our structured approach ensures thorough and actionable feedback
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                { title: "Code Submission", desc: "Upload your code and specify review requirements" },
                { title: "Expert Assignment", desc: "Matched with qualified reviewers based on your tech stack" },
                { title: "Comprehensive Analysis", desc: "Line-by-line review with detailed feedback" },
                { title: "Interactive Discussion", desc: "Direct communication with reviewers for clarifications" }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <HawklyCard variant="glass" elevation="subtle" glow={true} className="p-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center text-white">Detailed Reports</h3>
              <p className="text-gray-300 mb-6 text-center">
                Receive comprehensive reports with actionable recommendations, 
                code snippets, and best practice guidelines.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Line-by-line annotations</li>
                <li>• Severity classifications</li>
                <li>• Improvement suggestions</li>
                <li>• Best practice recommendations</li>
              </ul>
            </HawklyCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-cyan-900/40"></div>
        <div className="absolute inset-0 bg-[url('/src/assets/images/grid-pattern.svg')] opacity-10"></div>
        
        <HawklyCard variant="highlighted" elevation="strong" glow={true} className="container mx-auto px-4 text-center max-w-4xl py-12 relative z-10 border-blue-500/30">
          <SecurityBadge level="advanced" verified={true} size="lg" className="inline-block mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Improve Your Code Quality Today</h2>
          <p className="text-xl mb-8 text-gray-300">
            Get expert feedback and elevate your development practices
          </p>
          <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 border-none px-8 py-6 text-lg">
            <Link to="/request-audit">Start Code Review</Link>
          </Button>
        </HawklyCard>
      </section>
    </div>
  );
}
