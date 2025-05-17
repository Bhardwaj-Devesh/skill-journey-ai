
import React from 'react';
import Navbar from '@/components/Navbar';
import PhaseProgress from '@/components/PhaseProgress';
import SkillsRadarChart from '@/components/SkillsRadarChart';
import ProjectCard from '@/components/ProjectCard';
import MentorFeedback from '@/components/MentorFeedback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const recentProjects = [
  {
    title: "AI Image Generator",
    description: "A deep learning model that generates images based on text descriptions.",
    status: "ongoing" as const,
    skills: ["Python", "TensorFlow", "Computer Vision"],
    startDate: "May 1, 2023",
    endDate: "Jul 15, 2023",
    progress: 65,
  },
  {
    title: "NLP Text Summarizer",
    description: "An NLP tool that creates concise summaries of long articles.",
    status: "planned" as const,
    skills: ["Python", "NLP", "Transformer Models"],
    startDate: "Jun 20, 2023",
    progress: 20,
  }
];

const mentorFeedback = [
  {
    id: "1",
    mentorName: "Dr. Sarah Chen",
    mentorInitials: "SC",
    mentorAvatar: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=300",
    message: "Great progress on your NLP project! Consider adding a section about transformer architecture limitations in your documentation.",
    createdAt: new Date(2023, 4, 15),
    status: "resolved" as const,
  },
  {
    id: "2",
    mentorName: "Prof. James Wilson",
    mentorInitials: "JW",
    message: "I'd recommend focusing more on practical applications of your AI model. Let's discuss this in our next meeting.",
    createdAt: new Date(2023, 5, 2),
    status: "pending" as const,
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Navbar />
      <div className="flex-1 p-4 md:p-6 md:ml-60">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold">Welcome back, AI Student</h1>
            <p className="text-muted-foreground">Your AI career journey is 45% complete</p>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            {/* Left column - 4/6 width */}
            <div className="lg:col-span-4 space-y-6">
              <PhaseProgress />
              
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Projects</h2>
                <Link to="/projects">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    View all <ChevronRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentProjects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Career Insights</CardTitle>
                  <CardDescription>
                    Personalized recommendations based on your profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg bg-accent/50">
                    <h3 className="font-medium mb-2">Suggested Next Steps</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <div className="bg-primary h-2 w-2 rounded-full mt-1.5 mr-2" />
                        <span>Complete the "AI Ethics" section in your profile</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary h-2 w-2 rounded-full mt-1.5 mr-2" />
                        <span>Connect with 2 more mentors in the ML/AI field</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary h-2 w-2 rounded-full mt-1.5 mr-2" />
                        <span>Add a cloud deployment component to your current project</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">Refresh Insights</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - 2/6 width */}
            <div className="lg:col-span-2 space-y-6">
              <SkillsRadarChart />
              
              <MentorFeedback feedbackItems={mentorFeedback} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Daily Post</CardTitle>
                  <CardDescription>Share your progress on social media</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Generate LinkedIn Post</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
