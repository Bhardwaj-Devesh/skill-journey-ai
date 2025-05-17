
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Code, BarChart2, Users, TrendingUp } from 'lucide-react';

interface SuggestionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  popularity: number;
}

const Suggestion: React.FC<SuggestionProps> = ({
  icon,
  title,
  description,
  tags,
  popularity
}) => {
  return (
    <div className="border rounded-lg p-4 bg-card hover:border-career-purple transition-all">
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-full bg-accent/50 flex items-center justify-center mr-3 shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="font-medium text-base flex justify-between items-center">
            <span>{title}</span>
            <span className="text-xs flex items-center text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 inline" />
              {popularity}% pursuing
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="bg-accent/40">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface AICareerSuggestionsProps {
  userData?: {
    interests?: string[];
    skills?: string[];
    phase?: number;
  };
}

const AICareerSuggestions: React.FC<AICareerSuggestionsProps> = ({ userData }) => {
  // These would come from the backend based on user's profile
  const personalized = [
    {
      icon: <Code className="h-5 w-5 text-violet-500" />,
      title: "Learn Retrieval-Augmented Generation (RAG)",
      description: "Based on your interests in NLP, RAG is a powerful technique to enhance LLM outputs with external knowledge.",
      tags: ["NLP", "LangChain", "Vector DB"],
      popularity: 78
    },
    {
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      title: "Explore Multimodal AI Development",
      description: "Combining text, vision, and audio understanding can open new possibilities in your AI career.",
      tags: ["Vision", "NLP", "Audio", "Multimodal"],
      popularity: 65
    },
    {
      icon: <BarChart2 className="h-5 w-5 text-green-500" />,
      title: "Master Prompt Engineering",
      description: "As LLMs become more prevalent, prompt engineering skills are increasingly valued in the industry.",
      tags: ["LLMs", "GPT", "Prompting"],
      popularity: 92
    },
    {
      icon: <Users className="h-5 w-5 text-amber-500" />,
      title: "Join an AI Ethics Committee",
      description: "Contributing to responsible AI development can differentiate your profile in a competitive market.",
      tags: ["Ethics", "Governance", "Responsible AI"],
      popularity: 53
    }
  ];

  const peerBased = [
    {
      icon: <Code className="h-5 w-5 text-violet-500" />,
      title: "Build an AI-Powered Portfolio Website",
      description: "Students with similar skills to yours are creating interactive portfolios showcasing their AI projects.",
      tags: ["Portfolio", "Web Dev", "Showcase"],
      popularity: 82
    },
    {
      icon: <Users className="h-5 w-5 text-blue-500" />,
      title: "Contribute to Open Source LLM Projects",
      description: "Peers in your phase are gaining visibility by contributing to projects like LangChain and LlamaIndex.",
      tags: ["Open Source", "GitHub", "Community"],
      popularity: 67
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Career Insights</span>
          <span className="text-xs bg-accent/80 px-2 py-1 rounded-full text-accent-foreground font-normal">
            AI-Generated
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-sm mb-3 flex items-center">
            <span>Personalized Suggestions</span>
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full ml-2">
              For You
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {personalized.map((suggestion, idx) => (
              <Suggestion key={idx} {...suggestion} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm mb-3 flex items-center">
            <span>People Like You Are Also...</span>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full ml-2">
              Peer Insights
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {peerBased.map((suggestion, idx) => (
              <Suggestion key={idx} {...suggestion} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AICareerSuggestions;
