
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface FeedbackItem {
  id: string;
  mentorName: string;
  mentorAvatar?: string;
  mentorInitials: string;
  message: string;
  createdAt: Date;
  status: "pending" | "resolved";
}

interface MentorFeedbackProps {
  feedbackItems: FeedbackItem[];
}

const MentorFeedback = ({ feedbackItems }: MentorFeedbackProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Mentor Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {feedbackItems.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">No feedback received yet</p>
        ) : (
          feedbackItems.map((item) => (
            <div 
              key={item.id} 
              className="p-4 border rounded-lg flex space-x-3 bg-card"
            >
              <Avatar>
                <AvatarImage src={item.mentorAvatar} />
                <AvatarFallback>{item.mentorInitials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{item.mentorName}</div>
                  <Badge
                    variant={item.status === "pending" ? "outline" : "default"}
                    className={
                      item.status === "pending" 
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200" 
                      : "bg-green-100 text-green-800 border-green-200"
                    }
                  >
                    {item.status === "pending" ? "Pending" : "Resolved"}
                  </Badge>
                </div>
                <div className="text-sm mt-1">{item.message}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  {formatDistanceToNow(item.createdAt, { addSuffix: true })}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default MentorFeedback;
