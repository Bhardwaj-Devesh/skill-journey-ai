
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import PhaseProgress from '@/components/PhaseProgress';
import SkillsRadarChart from '@/components/SkillsRadarChart';
import ProjectCard from '@/components/ProjectCard';
import MentorFeedback from '@/components/MentorFeedback';
import AICareerSuggestions from '@/components/AICareerSuggestions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Dashboard = () => {
  const { profile } = useAuth();
  const [projects, setProjects] = useState([]);
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile) return;
      
      setLoading(true);
      try {
        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', profile.id)
          .order('created_at', { ascending: false })
          .limit(2);
        
        if (projectsError) throw projectsError;
        
        // If no projects yet, use mock data
        if (projectsData && projectsData.length > 0) {
          setProjects(projectsData);
        } else {
          // Mock data
          setProjects([
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
          ]);
        }
        
        // Fetch feedback
        const { data: feedbackData, error: feedbackError } = await supabase
          .from('mentor_feedback')
          .select('*, profiles!mentor_feedback_mentor_id_fkey(full_name)')
          .eq('student_id', profile.id)
          .order('created_at', { ascending: false })
          .limit(2);
        
        if (feedbackError) throw feedbackError;
        
        // If no feedback yet, use mock data
        if (feedbackData && feedbackData.length > 0) {
          setFeedbackItems(feedbackData.map(item => ({
            id: item.id,
            mentorName: item.profiles?.full_name || 'Mentor',
            mentorInitials: (item.profiles?.full_name || 'M')[0],
            message: item.feedback,
            createdAt: new Date(item.created_at),
            status: item.status
          })));
        } else {
          // Mock data
          setFeedbackItems([
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
          ]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [profile]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Navbar />
      <div className="flex-1 p-4 md:p-6 md:ml-60">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name?.split(' ')[0] || 'AI Student'}</h1>
            <p className="text-muted-foreground flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 inline" />
              Your AI career journey is 45% complete
            </p>
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
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
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
