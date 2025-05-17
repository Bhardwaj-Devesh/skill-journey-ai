
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';

// Mock projects data
const projectsData = [
  {
    title: "AI Image Generator",
    description: "A deep learning model that generates images based on text descriptions using GANs.",
    status: "ongoing" as const,
    skills: ["Python", "TensorFlow", "Computer Vision", "GANs"],
    startDate: "May 1, 2023",
    endDate: "Jul 15, 2023",
    progress: 65,
  },
  {
    title: "NLP Text Summarizer",
    description: "An NLP tool that creates concise summaries of long articles using transformer models.",
    status: "planned" as const,
    skills: ["Python", "NLP", "Transformer Models"],
    startDate: "Jun 20, 2023",
    progress: 20,
  },
  {
    title: "Stock Price Predictor",
    description: "Machine learning model to predict stock prices using historical data and sentiment analysis.",
    status: "completed" as const,
    skills: ["Python", "Pandas", "Time Series", "ML"],
    startDate: "Jan 15, 2023",
    endDate: "Mar 30, 2023",
    progress: 100,
  },
  {
    title: "Customer Churn Analysis",
    description: "Analysis of customer data to predict and prevent churn using classification algorithms.",
    status: "completed" as const,
    skills: ["Python", "Scikit-learn", "Data Analysis", "Classification"],
    startDate: "Feb 10, 2023",
    endDate: "Apr 5, 2023",
    progress: 100,
  }
];

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  
  const filteredProjects = filter === "all" 
    ? projectsData 
    : projectsData.filter(project => project.status === filter);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenDialog(false);
    toast.success("Project added successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Navbar />
      <div className="flex-1 p-4 md:p-6 md:ml-60">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Project Portfolio</h1>
              <p className="text-muted-foreground">
                Track and showcase your AI projects
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <Select
                value={filter}
                onValueChange={setFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                    <DialogDescription>
                      Add a new AI project to your portfolio
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddProject} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-title">Project Title</Label>
                      <Input id="project-title" placeholder="E.g. NLP Sentiment Analysis" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Description</Label>
                      <Textarea 
                        id="project-description"
                        placeholder="Briefly describe your project's goals and approach"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-start">Start Date</Label>
                        <Input id="project-start" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="project-end">End Date (Optional)</Label>
                        <Input id="project-end" type="date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-status">Status</Label>
                      <Select defaultValue="planned">
                        <SelectTrigger id="project-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-skills">Skills (comma separated)</Label>
                      <Input 
                        id="project-skills"
                        placeholder="E.g. Python, NLP, Transformers"
                        required
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Project</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No projects match your filter criteria</p>
                <Button 
                  variant="link" 
                  onClick={() => setFilter("all")}
                >
                  View all projects
                </Button>
              </div>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Project Ideas</CardTitle>
              <CardDescription>AI-suggested projects to enhance your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Recommendation System</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Build a content recommendation system using collaborative filtering and neural networks.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-accent text-xs px-2 py-0.5 rounded-full">Python</span>
                    <span className="bg-accent text-xs px-2 py-0.5 rounded-full">PyTorch</span>
                    <span className="bg-accent text-xs px-2 py-0.5 rounded-full">Recommendation</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Speech Emotion Recognition</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Create a model that detects emotional states from audio samples using deep learning.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-accent text-xs px-2 py-0.5 rounded-full">Audio</span>
                    <span className="bg-accent text-xs px-2 py-0.5 rounded-full">CNN</span>
                    <span className="bg-accent text-xs px-2 py-0.5 rounded-full">TensorFlow</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline">Generate More Ideas</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Projects;
