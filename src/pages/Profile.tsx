
import React from 'react';
import Navbar from '@/components/Navbar';
import SkillsRadarChart from '@/components/SkillsRadarChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Profile = () => {
  const handleSave = () => {
    toast.success('Profile updated successfully');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Navbar />
      <div className="flex-1 p-4 md:p-6 md:ml-60">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Your Career Profile</h1>
            <p className="text-muted-foreground">
              Complete your Ikigai profile to get personalized career guidance
            </p>
          </div>

          <Tabs defaultValue="ikigai">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="ikigai">Ikigai Profile</TabsTrigger>
              <TabsTrigger value="resume">Resume & Portfolio</TabsTrigger>
              <TabsTrigger value="settings">Profile Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="ikigai" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-phase-1 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">1</span>
                    </div>
                    Your Ikigai Profile
                  </CardTitle>
                  <CardDescription>
                    Complete these sections to discover your ideal AI career path
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="likes">What you love</Label>
                    <Textarea
                      id="likes"
                      placeholder="What aspects of technology and AI excite you the most?"
                      defaultValue="I love working with data and finding patterns. Machine learning algorithms fascinate me, especially when they can be applied to solve real-world problems. I enjoy the process of feature engineering and model optimization."
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="skills">What you're good at</Label>
                    <Textarea
                      id="skills"
                      placeholder="What technical and soft skills do you have?"
                      defaultValue="Python programming, data analysis with pandas, basic machine learning models, clear technical communication, and problem-solving. I'm also good at breaking complex problems into manageable parts."
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="values">What's important to you</Label>
                    <Textarea
                      id="values"
                      placeholder="What values and principles guide your career choices?"
                      defaultValue="Ethical use of technology, continuous learning, work-life balance, collaboration, and creating solutions that help people. I want to work on projects that have a positive social impact."
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="career">Career direction</Label>
                    <Textarea
                      id="career"
                      placeholder="What AI field or role are you most interested in?"
                      defaultValue="I'm interested in becoming a Machine Learning Engineer with a focus on NLP applications. I'd like to work on projects that involve text analytics and language understanding."
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>Save Profile</Button>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkillsRadarChart />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Career Alignment</CardTitle>
                    <CardDescription>AI-generated career path recommendation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg bg-green-50">
                      <h3 className="font-medium text-green-800">Top Match: ML Engineer (NLP Focus)</h3>
                      <p className="text-sm text-green-700 mt-2">
                        Your profile shows strong alignment with Machine Learning Engineering roles focused on Natural Language Processing.
                      </p>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-semibold">Other potential paths:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="bg-blue-500 h-2 w-2 rounded-full mt-1.5 mr-2" />
                          <span>Data Scientist (85% match)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-purple-500 h-2 w-2 rounded-full mt-1.5 mr-2" />
                          <span>AI Research Assistant (78% match)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-pink-500 h-2 w-2 rounded-full mt-1.5 mr-2" />
                          <span>NLP Specialist (75% match)</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="resume" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resume & Portfolio</CardTitle>
                  <CardDescription>Upload your documents and add professional links</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Resume</Label>
                    <div className="border border-dashed rounded-lg p-8 text-center">
                      <p className="text-muted-foreground mb-4">
                        Drag and drop your resume PDF or click to upload
                      </p>
                      <Button variant="outline">Upload Resume</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Professional Links</Label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium min-w-20">LinkedIn</span>
                        <Input placeholder="LinkedIn URL" />
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium min-w-20">GitHub</span>
                        <Input placeholder="GitHub URL" />
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium min-w-20">Portfolio</span>
                        <Input placeholder="Personal website/portfolio URL" />
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium min-w-20">Hugging Face</span>
                        <Input placeholder="Hugging Face profile URL" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>Save Links</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="AI Student" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="student@careerai.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Update Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSave}>Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
