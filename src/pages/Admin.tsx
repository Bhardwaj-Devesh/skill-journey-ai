
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Admin = () => {
  const { profile } = useAuth();
  const [users, setUsers] = React.useState<any[]>([]);
  const [mentors, setMentors] = React.useState<any[]>([]);
  const [projects, setProjects] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMockData = async () => {
      setLoading(true);
      try {
        // Mock users data
        const mockUsers = [
          {
            id: '1', 
            full_name: 'John Smith',
            role: 'student',
            phase: 1,
            created_at: '2023-01-15T10:30:00Z'
          },
          {
            id: '2', 
            full_name: 'Sarah Chen',
            role: 'mentor',
            phase: null,
            mentor_approved: true,
            expertise: ['Technical Mentoring', 'Career Guidance'],
            created_at: '2023-01-10T14:20:00Z'
          },
          {
            id: '3', 
            full_name: 'Admin User',
            role: 'admin',
            phase: null,
            created_at: '2023-01-01T09:00:00Z'
          },
          {
            id: '4', 
            full_name: 'Emma Johnson',
            role: 'student',
            phase: 2,
            created_at: '2023-01-20T11:45:00Z'
          }
        ];
        setUsers(mockUsers);
        
        // Mock mentors data
        const mockMentors = mockUsers.filter(user => user.role === 'mentor');
        setMentors(mockMentors);
        
        // Mock projects data
        const mockProjects = [
          {
            id: '101',
            title: 'AI Image Generator',
            user_id: '1',
            profiles: { full_name: 'John Smith' },
            status: 'ongoing',
            created_at: '2023-03-15T10:30:00Z'
          },
          {
            id: '102',
            title: 'NLP Text Summarizer',
            user_id: '1',
            profiles: { full_name: 'John Smith' },
            status: 'planned',
            created_at: '2023-04-10T14:20:00Z'
          },
          {
            id: '103',
            title: 'Deep Learning Project',
            user_id: '4',
            profiles: { full_name: 'Emma Johnson' },
            status: 'completed',
            created_at: '2023-02-20T11:45:00Z'
          }
        ];
        setProjects(mockProjects);
      } catch (error) {
        console.error('Error fetching mock data:', error);
        toast.error('Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMockData();
  }, []);

  const changeMentorStatus = async (userId: string, approved: boolean) => {
    try {
      // Update local state only since we're not using a database yet
      setMentors(mentors.map(mentor => 
        mentor.id === userId ? { ...mentor, mentor_approved: approved } : mentor
      ));
      
      toast.success(`Mentor ${approved ? 'approved' : 'unapproved'} successfully`);
    } catch (error) {
      console.error('Error updating mentor status:', error);
      toast.error('Failed to update mentor status');
    }
  };

  if (!profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>You do not have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="users">
          <TabsList className="mb-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  Manage all registered users in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading users...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Phase</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.full_name || 'Unnamed'}</TableCell>
                          <TableCell>
                            <span className={`capitalize ${user.role === 'admin' ? 'text-red-500 font-medium' : ''}`}>
                              {user.role}
                            </span>
                          </TableCell>
                          <TableCell>{user.phase || 1}</TableCell>
                          <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mentors">
            <Card>
              <CardHeader>
                <CardTitle>Mentors Management</CardTitle>
                <CardDescription>
                  Review and approve mentor applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading mentors...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Expertise</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mentors.map((mentor) => (
                        <TableRow key={mentor.id}>
                          <TableCell>{mentor.full_name || 'Unnamed'}</TableCell>
                          <TableCell>{mentor.expertise || 'Not specified'}</TableCell>
                          <TableCell>
                            <span className={`capitalize ${mentor.mentor_approved ? 'text-green-500' : 'text-amber-500'}`}>
                              {mentor.mentor_approved ? 'Approved' : 'Pending'}
                            </span>
                          </TableCell>
                          <TableCell className="space-x-2">
                            <Button 
                              variant={mentor.mentor_approved ? "outline" : "default"} 
                              size="sm"
                              onClick={() => changeMentorStatus(mentor.id, !mentor.mentor_approved)}
                            >
                              {mentor.mentor_approved ? "Unapprove" : "Approve"}
                            </Button>
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>All Projects</CardTitle>
                <CardDescription>
                  Monitor and manage all student projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading projects...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>{project.title}</TableCell>
                          <TableCell>{project.profiles?.full_name || 'Unknown'}</TableCell>
                          <TableCell>
                            <span className={`capitalize ${
                              project.status === 'completed' ? 'text-green-500' : 
                              project.status === 'ongoing' ? 'text-blue-500' : 'text-amber-500'
                            }`}>
                              {project.status}
                            </span>
                          </TableCell>
                          <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Mentor Feedback</CardTitle>
                <CardDescription>
                  Monitor all feedback exchanges between mentors and students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Feedback management coming soon
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>
                  Configure global application settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  System settings configuration coming soon
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
