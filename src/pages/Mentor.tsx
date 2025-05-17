
import React from 'react';
import Navbar from '@/components/Navbar';
import MentorFeedback from '@/components/MentorFeedback';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

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

// Mock data for available mentors
const availableMentors = [
  {
    name: "Dr. Sarah Chen",
    title: "Senior Data Scientist at TechCorp",
    avatar: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=300",
    initials: "SC",
    expertise: ["Machine Learning", "Computer Vision", "Research"],
    available: true
  },
  {
    name: "Prof. James Wilson",
    title: "AI Research Lead & University Professor",
    initials: "JW",
    expertise: ["Deep Learning", "Neural Networks", "Academic Research"],
    available: false
  },
  {
    name: "Dr. Maria Rodriguez",
    title: "ML Engineer at AI Solutions",
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300",
    initials: "MR",
    expertise: ["NLP", "AI Ethics", "Production ML Systems"],
    available: true
  }
];

const Mentor = () => {
  const handleSubmitQuestion = () => {
    toast.success("Question submitted to mentors");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Navbar />
      <div className="flex-1 p-4 md:p-6 md:ml-60">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Mentor Consultancy</h1>
            <p className="text-muted-foreground">
              Connect with industry experts to guide your AI career journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Feedback */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
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
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSubmitQuestion}>Submit Question</Button>
                </CardFooter>
              </Card>

              <MentorFeedback feedbackItems={feedbackItems} />
            </div>
            
            {/* Right column - Mentors */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Mentors</CardTitle>
                  <CardDescription>
                    Book a session with our AI industry experts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {availableMentors.map((mentor, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 border rounded-lg flex space-x-3 hover:border-primary transition-colors"
                    >
                      <Avatar>
                        <AvatarImage src={mentor.avatar} />
                        <AvatarFallback>{mentor.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{mentor.name}</div>
                        <div className="text-sm text-muted-foreground">{mentor.title}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {mentor.expertise.map((skill, i) => (
                            <span 
                              key={i} 
                              className="bg-accent text-xs px-2 py-0.5 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button 
                          size="sm" 
                          variant={mentor.available ? "default" : "outline"} 
                          disabled={!mentor.available}
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          Book
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Mentors</Button>
                </CardFooter>
              </Card>
              
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
        </div>
      </div>
    </div>
  );
};

export default Mentor;
