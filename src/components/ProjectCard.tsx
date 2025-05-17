
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type ProjectStatus = 'planned' | 'ongoing' | 'completed';

interface ProjectCardProps {
  title: string;
  description: string;
  status: ProjectStatus;
  skills: string[];
  startDate: string;
  endDate?: string;
  progress?: number;
}

const statusColors = {
  planned: "bg-blue-100 text-blue-800 border-blue-200",
  ongoing: "bg-amber-100 text-amber-800 border-amber-200",
  completed: "bg-green-100 text-green-800 border-green-200"
};

const statusLabels = {
  planned: "Planned",
  ongoing: "Ongoing",
  completed: "Completed"
};

const ProjectCard = ({
  title,
  description,
  status,
  skills,
  startDate,
  endDate,
  progress = 0
}: ProjectCardProps) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-accent text-accent-foreground">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-1.5" 
            aria-label={`Project progress: ${progress}%`}
          />
        </div>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-muted-foreground">
        <div className="flex justify-between w-full">
          <span>Started: {startDate}</span>
          {endDate && <span>Due: {endDate}</span>}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
