
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const phases = [
  {
    id: 1,
    name: "Introspection",
    progress: 100,
    description: "Understand your likes, skills, values, and career direction",
    tasks: ["Complete Ikigai profile", "Take skills assessment", "Define values"],
    class: "phase-progress-1"
  },
  {
    id: 2,
    name: "Exploration",
    progress: 65,
    description: "Research career paths, connect with mentors, identify projects",
    tasks: ["Research AI roles", "Connect with 3 mentors", "Identify 2 projects"],
    class: "phase-progress-2"
  },
  {
    id: 3,
    name: "Reflection",
    progress: 20,
    description: "Analyze feedback, refine direction, prepare for applications",
    tasks: ["Get mentor feedback", "Refine resume", "Practice interviews"],
    class: "phase-progress-3"
  },
  {
    id: 4,
    name: "Action",
    progress: 5,
    description: "Apply for roles, network, showcase projects, interview",
    tasks: ["Apply to 10 roles", "Complete portfolio", "Share on social media"],
    class: "phase-progress-4"
  }
];

const PhaseProgress = () => {
  const currentPhase = 2; // This would come from user's data in a real app
  const overallProgress = Math.floor(
    phases.reduce((sum, phase) => sum + phase.progress, 0) / phases.length
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Career Phase Progress</span>
          <span className="text-sm font-normal text-muted-foreground">
            Overall: {overallProgress}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue={currentPhase.toString()}>
          <TabsList className="grid grid-cols-4">
            {phases.map((phase) => (
              <TabsTrigger key={phase.id} value={phase.id.toString()}>
                Phase {phase.id}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {phases.map((phase) => (
            <TabsContent key={phase.id} value={phase.id.toString()} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{phase.name}</h3>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>
                <span className="text-xl font-semibold">{phase.progress}%</span>
              </div>
              
              <Progress 
                value={phase.progress} 
                className={`h-2 ${phase.class}`}
                aria-label={`Phase ${phase.id} progress: ${phase.progress}%`}
              />
              
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-semibold">Key Tasks:</h4>
                <ul className="space-y-2">
                  {phase.tasks.map((task, index) => (
                    <li 
                      key={index} 
                      className="flex items-center text-sm"
                    >
                      <div 
                        className={`h-2 w-2 rounded-full mr-2 ${
                          phase.id < currentPhase ? 'bg-green-500' : 
                          (phase.id === currentPhase ? phase.class : 'bg-gray-300')
                        }`}
                      />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PhaseProgress;
