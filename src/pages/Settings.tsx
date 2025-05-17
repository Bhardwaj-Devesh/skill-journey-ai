
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Settings = () => {
  const handleSave = () => {
    toast.success('Settings updated successfully');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Navbar />
      <div className="flex-1 p-4 md:p-6 md:ml-60">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>

          <Tabs defaultValue="profile">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and profile picture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300" />
                      <AvatarFallback className="text-2xl">AI</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">Change Avatar</Button>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG or GIF. Max 2MB.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="AI" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Student" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="display-name">Display Name</Label>
                      <Input id="display-name" defaultValue="AI Student" />
                      <p className="text-xs text-muted-foreground">
                        This is the name that will be displayed on your profile
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input 
                        id="bio" 
                        defaultValue="Learning AI and building ML projects for my portfolio." 
                      />
                      <p className="text-xs text-muted-foreground">
                        Brief description for your profile
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Social Profiles</CardTitle>
                  <CardDescription>
                    Connect your social accounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium min-w-20">LinkedIn</span>
                    <Input placeholder="LinkedIn URL" />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium min-w-20">GitHub</span>
                    <Input placeholder="GitHub URL" />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium min-w-20">Twitter</span>
                    <Input placeholder="Twitter URL" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Update your account credentials
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="student@careerai.com" />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Update Password</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Export Your Data</div>
                      <div className="text-sm text-muted-foreground">
                        Download a copy of your profile and project data
                      </div>
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-destructive">Delete Account</div>
                      <div className="text-sm text-muted-foreground">
                        Permanently delete your account and all your data
                      </div>
                    </div>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Choose how you want to be notified
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Mentor Feedback</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified when you receive feedback from mentors
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Career Recommendations</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified about new AI job recommendations
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Project Reminders</div>
                      <div className="text-sm text-muted-foreground">
                        Get reminders about your upcoming project deadlines
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Marketing Emails</div>
                      <div className="text-sm text-muted-foreground">
                        Receive emails about new features and offers
                      </div>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
