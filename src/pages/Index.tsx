
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-career-purple to-phase-3 flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-display font-bold text-xl">CareerAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Log in
            </Link>
            <Link to="/login?register=true">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your <span className="gradient-text">AI-powered</span> Career Coach
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
            Personalized guidance, project tracking, and mentor feedback for students and professionals transitioning into AI roles.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login?register=true">
              <Button size="lg" className="px-8">
                Start Your AI Career Journey
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Explore the Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-muted/40 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Your Path to an AI Career</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((phase) => (
              <div key={phase} className="bg-background rounded-lg p-6 shadow-sm border">
                <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center phase-progress-${phase}`}>
                  <span className="text-white font-bold text-lg">{phase}</span>
                </div>
                <h3 className="font-bold text-xl mb-2">
                  {phase === 1 && "Introspection"}
                  {phase === 2 && "Exploration"}
                  {phase === 3 && "Reflection"}
                  {phase === 4 && "Action"}
                </h3>
                <p className="text-muted-foreground">
                  {phase === 1 && "Understand your skills, values, and career direction through AI assessment."}
                  {phase === 2 && "Explore AI career paths, connect with mentors, and identify projects."}
                  {phase === 3 && "Reflect on feedback, refine your direction, and prepare for applications."}
                  {phase === 4 && "Apply for roles, network effectively, and showcase your projects."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features and Benefits */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features Designed for Your Success</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg bg-background flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-career-purple/10 flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-full bg-career-purple flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">AI Career Profiling</h3>
              <p className="text-muted-foreground">
                Discover your ideal AI career path based on your skills, interests, and values.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg bg-background flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-career-purple/10 flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-full bg-career-purple flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Project Tracking</h3>
              <p className="text-muted-foreground">
                Organize and showcase your AI projects to build a compelling portfolio.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg bg-background flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-career-purple/10 flex items-center justify-center mb-4">
                <div className="w-8 h-8 rounded-full bg-career-purple flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Mentor Feedback</h3>
              <p className="text-muted-foreground">
                Receive personalized guidance from industry professionals to accelerate your growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-career-purple/90 to-phase-3/90 text-white py-16 px-4 mt-auto">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Launch Your AI Career?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join CareerAI today and take the first step towards a successful career in artificial intelligence.
          </p>
          <Link to="/login?register=true">
            <Button variant="secondary" size="lg" className="bg-white text-career-purple hover:bg-white/90">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-career-purple to-phase-3 flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="font-display font-medium">CareerAI</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CareerAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
