import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MentorFeedback from '@/components/MentorFeedback';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, BookOpen, Users, Briefcase, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';

// Define the Expertise type to avoid type errors
type Expertise = 'Career Guidance' | 'Study Abroad' | 'Industry Referrals' | 'Technical Mentoring' | 'Interview Preparation' | 'Academic Research';

// Mock data for mentor feedback
const feedbackItems = [
  {
    id: "1",
    mentorName: "Dr. Sarah Chen",
    mentorInitials: "SC",
    mentorAvatar: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=300",
    message: "Your NLP project shows great promise! Consider adding a section about transformer architecture limitations in your documentation. Also, the text preprocessing could be more robust - look into spaCy for better entity recognition.",
    createdAt: new Date(2023, 4, 15),
    status: "resolved" as const,
  },
  {
    id: "2",
    mentorName: "Prof. James Wilson",
    mentorInitials: "JW",
    message: "I'd recommend focusing more on practical applications of your AI model. The technical implementation is solid, but you need to demonstrate how it solves real-world problems. Let's discuss specific use cases in our next meeting.",
    createdAt: new Date(2023, 5, 2),
    status: "pending" as const,
  },
  {
    id: "3",
    mentorName: "Dr. Maria Rodriguez",
    mentorInitials: "MR",
    mentorAvatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300",
    message: "Your resume needs more emphasis on quantifiable achievements. Instead of just listing technologies, show how you applied them to achieve specific outcomes. I've made comments on the shared document.",
    createdAt: new Date(2023, 5, 10),
    status: "pending" as const,
  }
];

type MentorProfile = {
  id: string;
  full_name: string;
  avatar_url?: string;
  expertise: Expertise[];
  bio?: string;
  available: boolean;
  meetings_count?: number;
  rating?: number;
};

const MentorPage = () => {
  const { profile } = useAuth();
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [userMeetings, setUserMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(true);
  const [question, setQuestion] = useState('');
  const [activeTab, setActiveTab] = useState<'student' | 'mentor'>(profile?.role === 'mentor' ? 'mentor' : 'student');

  useEffect(() => {
    // Set correct tab based on user role
    if (profile) {
      setActiveTab(profile.role === 'mentor' ? 'mentor' : 'student');
    }
    
    // Fetch mentors - using mock data for now
    const fetchMentors = async () => {
      setLoadingMentors(true);
      try {
        // Using mock data
        const mockMentors: MentorProfile[] = [
          {
            id: "1",
            full_name: "Dr. Sarah Chen",
            avatar_url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=300",
            expertise: ['Technical Mentoring', 'Career Guidance'],
            bio: "Senior Data Scientist with 10+ years experience in AI and machine learning",
            available: true,
            meetings_count: 24,
            rating: 4.9
          },
          {
            id: "2",
            full_name: "Prof. James Wilson",
            expertise: ['Study Abroad', 'Academic Research' as Expertise],
            bio: "AI Research Lead & University Professor specializing in deep learning",
            available: true,
            meetings_count: 15,
            rating: 4.7
          },
          {
            id: "3",
            full_name: "Dr. Maria Rodriguez",
            avatar_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300",
            expertise: ['Industry Referrals', 'Interview Preparation'],
            bio: "ML Engineer with experience at top AI companies",
            available: false,
            meetings_count: 32,
            rating: 4.8
          }
        ];
        setMentors(mockMentors);
      } catch (error) {
        console.error("Error setting mock mentors:", error);
        toast.error("Failed to load mentors");
      } finally {
        setLoadingMentors(false);
      }
    };

    fetchMentors();
  }, [profile]);

  const handleSubmitQuestion = () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    toast.success("Question submitted to mentors");
    setQuestion('');
  };

  const MentorStudentView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
      {/* Center column - Mentors List (4/7) */}
      <div className="lg:col-span-4">
        <Card>
          <CardHeader>
            <CardTitle>Available Mentors</CardTitle>
            <CardDescription>
              Connect with industry experts in various fields
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full">All</Button>
                <Button variant="outline" size="sm" className="rounded-full">Career Guidance</Button>
                <Button variant="outline" size="sm" className="rounded-full">Study Abroad</Button>
                <Button variant="outline" size="sm" className="rounded-full">Industry Referrals</Button>
                <Button variant="outline" size="sm" className="rounded-full">Technical Mentoring</Button>
              </div>
            </div>
            
            {loadingMentors ? (
              <div className="text-center py-8">Loading mentors...</div>
            ) : (
              <div className="space-y-4">
                {mentors.map((mentor) => (
                  <div 
                    key={mentor.id} 
                    className="p-4 border rounded-lg flex flex-col sm:flex-row gap-4 hover:border-primary transition-colors"
                  >
                    <div className="flex sm:flex-col items-center sm:items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={mentor.avatar_url} />
                        <AvatarFallback className="text-lg">{mentor.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="text-center sm:text-left">
                        <div className="flex items-center gap-1">
                          <span className={`h-2 w-2 rounded-full ${mentor.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                          <span className="text-xs text-muted-foreground">{mentor.available ? 'Available' : 'Busy'}</span>
                        </div>
                        <div className="text-xs mt-1">{mentor.meetings_count} sessions</div>
                        {mentor.rating && (
                          <div className="text-xs flex items-center mt-1">
                            ★★★★★ <span className="ml-1">{mentor.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-medium text-lg mb-1">{mentor.full_name}</div>
                      <div className="text-sm text-muted-foreground mb-2">{mentor.bio}</div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {mentor.expertise.map((skill, i) => (
                          <span 
                            key={i} 
                            className="bg-accent/80 text-xs px-2 py-0.5 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 sm:flex-none"
                          variant={mentor.available ? "default" : "outline"}
                          disabled={!mentor.available}
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          Book Session
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Ask a Question Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
            <CardDescription>
              Get guidance from our panel of AI industry mentors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="What question do you have about your AI career path or projects?" 
              className="min-h-32"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmitQuestion}>Submit Question</Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Right column - Feedback (3/7) */}
      <div className="lg:col-span-3 space-y-6">
        <MentorFeedback feedbackItems={feedbackItems} />
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">Dr. Sarah Chen</div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Upcoming
                </span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Project Review & Career Planning
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <span>May 25, 2023 • 2:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const MentorDashboardView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mentor Dashboard</CardTitle>
          <CardDescription>
            Manage your mentorship profile and student interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="feedback">Feedback History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        {profile?.avatar_url ? (
                          <AvatarImage src={profile.avatar_url} />
                        ) : (
                          <AvatarFallback className="text-2xl">{profile?.full_name?.[0] || 'M'}</AvatarFallback>
                        )}
                      </Avatar>
                      <h3 className="text-xl font-medium">{profile?.full_name || 'Mentor'}</h3>
                      <p className="text-sm text-muted-foreground mt-1">AI Industry Expert</p>
                      <div className="flex mt-2">
                        <span className="text-sm">★★★★★</span>
                        <span className="text-sm ml-1">5.0</span>
                      </div>
                      <Button className="w-full mt-4" variant="outline">Edit Profile</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Expertise Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-3 flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm">Career Guidance</div>
                      </div>
                      <div className="border rounded-lg p-3 flex items-center space-x-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm">Study Abroad</div>
                      </div>
                      <div className="border rounded-lg p-3 flex items-center space-x-3">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                        <div className="text-sm">Industry Referrals</div>
                      </div>
                      <Button variant="outline" className="border rounded-lg p-3 flex items-center justify-center space-x-2">
                        <span>+ Add Expertise</span>
                      </Button>
                    </div>
                    <Button className="w-full mt-4" variant="default">
                      {profile?.available ? "Available for Bookings" : "Set as Available"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="bookings">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Upcoming Sessions</h3>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Open Calendar
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">John Smith</div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Tomorrow
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Career Transition Planning
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>May 25, 2023 • 3:30 PM (30 min)</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">Reschedule</Button>
                    <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">Cancel</Button>
                  </div>
                </div>
                
                <h3 className="font-medium mt-6">Past Sessions</h3>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Emma Johnson</div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Completed
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Project Review
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span>May 15, 2023 • 2:00 PM (45 min)</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">Send Feedback</Button>
                    <Button size="sm" variant="outline">Schedule Follow-up</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="feedback">
              <div className="space-y-4">
                {feedbackItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 border rounded-lg"
                  >
                    <div className="flex justify-between mb-3">
                      <div className="font-medium">To: Student Name</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm">{item.message}</div>
                    <div className="flex justify-end mt-3">
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Navbar />
      <div className="flex-1 p-4 md:p-6 md:ml-60">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Mentor Consultancy</h1>
            <p className="text-muted-foreground">
              {profile?.role === 'mentor' 
                ? 'Provide guidance to students and manage your mentorship profile' 
                : 'Connect with industry experts to guide your AI career journey'}
            </p>
          </div>

          {profile?.role === 'mentor' ? (
            <Tabs defaultValue="mentor" className="mb-6">
              <TabsList>
                <TabsTrigger value="mentor" onClick={() => setActiveTab('mentor')}>Mentor Dashboard</TabsTrigger>
                <TabsTrigger value="student" onClick={() => setActiveTab('student')}>Student View</TabsTrigger>
              </TabsList>
            </Tabs>
          ) : null}

          {activeTab === 'student' ? <MentorStudentView /> : <MentorDashboardView />}
        </div>
      </div>
    </div>
  );
};

export default MentorPage;
