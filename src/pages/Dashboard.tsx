import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import SkillsRadarChart from '@/components/SkillsRadarChart';
import ProjectCard from '@/components/ProjectCard';
import MentorFeedback from '@/components/MentorFeedback';
import AICareerSuggestions from '@/components/AICareerSuggestions';
import PeerComparison from '@/components/PeerComparison';
import IkigaiChart from '@/components/IkigaiChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface IkigaiData {
  whatILove: string[];
  whatImGoodAt: string[];
  whatTheWorldNeeds: string[];
  whatICanBePaidFor: string[];
  summary: string;
}

const Dashboard = () => {
  const { profile } = useAuth();
  const [projects, setProjects] = useState([]);
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [peerComparisonData, setPeerComparisonData] = useState({
    technicalSkills: 82,
    projectExperience: 68,
    industryKnowledge: 75,
    problemSolving: 85,
    communicationSkills: 78,
    learningVelocity: 88
  });

  const [ikigaiData, setIkigaiData] = useState<IkigaiData>({
    whatILove: [],
    whatImGoodAt: [],
    whatTheWorldNeeds: [],
    whatICanBePaidFor: [],
    summary: ''
  });

  useEffect(() => {
    // Load Ikigai data from localStorage if available
    const savedIkigaiData = localStorage.getItem('ikigaiData');
    if (savedIkigaiData) {
      try {
        const parsedData = JSON.parse(savedIkigaiData);
        setIkigaiData(parsedData);
      } catch (error) {
        console.error('Error parsing Ikigai data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchMockData = async () => {
      if (!profile) return;
      
      setLoading(true);
      try {
        // Mock projects data
        const mockProjects = [
          {
            title: "AI Image Generator",
            description: "A deep learning model that generates images based on text descriptions.",
            status: "ongoing",
            skills: ["Python", "TensorFlow", "Computer Vision"],
            start_date: "2023-05-01",
            end_date: "2023-07-15",
            progress: 65,
          },
          {
            title: "NLP Text Summarizer",
            description: "An NLP tool that creates concise summaries of long articles.",
            status: "planned",
            skills: ["Python", "NLP", "Transformer Models"],
            start_date: "2023-06-20",
            progress: 20,
          }
        ];
        setProjects(mockProjects);
        
        // Mock feedback data
        const mockFeedback = [
          {
            id: "1",
            mentorName: "Dr. Sarah Chen",
            mentorInitials: "SC",
            mentorAvatar: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=300",
            message: "Great progress on your NLP project! Consider adding a section about transformer architecture limitations in your documentation.",
            createdAt: new Date(2023, 4, 15),
            status: "resolved",
          },
          {
            id: "2",
            mentorName: "Prof. James Wilson",
            mentorInitials: "JW",
            message: "I'd recommend focusing more on practical applications of your AI model. Let's discuss this in our next meeting.",
            createdAt: new Date(2023, 5, 2),
            status: "pending",
          }
        ];
        setFeedbackItems(mockFeedback);
      } catch (error) {
        console.error('Error setting mock data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMockData();
  }, [profile]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Navbar />
      <div className="flex-1 p-4 md:p-6 md:ml-60">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name?.split(' ')[0] || 'AI Student'}</h1>
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 inline" />
                Your AI career journey is 45% complete
              </p>
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  Update Ikigai Profile
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            {/* Left column - 4/6 width */}
            <div className="lg:col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Ikigai Career Map</CardTitle>
                  <CardDescription>
                    Your personalized career path based on your Ikigai profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <IkigaiChart data={ikigaiData} />
                </CardContent>
              </Card>

              <PeerComparison userData={peerComparisonData} />
                
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Recent Projects</h2>
                  <Link to="/projects">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      View all <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                  ))}
                </div>
              </div>
                
              <AICareerSuggestions userData={{ phase: profile?.phase || 1 }} />
            </div>
            
            {/* Right column - 2/6 width */}
            <div className="lg:col-span-2 space-y-6">
              <SkillsRadarChart />
              <MentorFeedback feedbackItems={feedbackItems} />
              
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
