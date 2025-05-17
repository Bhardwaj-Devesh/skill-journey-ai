import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import apiService from '@/services/api';

interface IkigaiData {
  whatILove: string[];
  whatImGoodAt: string[];
  whatTheWorldNeeds: string[];
  whatICanBePaidFor: string[];
  summary?: string;
}

interface ChatbotPhaseProgressProps {
  email: string;
  onUpdateIkigai: (category: keyof IkigaiData, items: string[]) => void;
}

const ChatbotPhaseProgress: React.FC<ChatbotPhaseProgressProps> = ({
  email,
  onUpdateIkigai
}) => {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot'; content: string }>>([]);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const phases = [
    {
      title: "What I Love",
      questions: [
        "What activities make you lose track of time?",
        "What topics do you love learning about?",
        "What would you do if money wasn't a concern?",
        "What brings you joy and excitement?"
      ]
    },
    {
      title: "What I'm Good At",
      questions: [
        "What skills do others often compliment you on?",
        "What tasks do you find easy that others struggle with?",
        "What have you been doing for a long time?",
        "What achievements are you most proud of?"
      ]
    },
    {
      title: "What the World Needs",
      questions: [
        "What problems in the world do you want to solve?",
        "What needs do you see in your community?",
        "What changes would you like to see in the world?",
        "What causes are you passionate about?"
      ]
    },
    {
      title: "What I Can Be Paid For",
      questions: [
        "What skills do you have that people would pay for?",
        "What services have you provided in the past?",
        "What expertise have you developed?",
        "What value can you create for others?"
      ]
    }
  ];

  const [answers, setAnswers] = useState<IkigaiData>({
    whatILove: [],
    whatImGoodAt: [],
    whatTheWorldNeeds: [],
    whatICanBePaidFor: [],
    summary: ''
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Start the conversation
  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        type: 'bot',
        content: "Welcome! Let's discover your Ikigai together. I'll ask you questions about different aspects of your life, and we'll map them out in real-time."
      });
      setTimeout(() => {
        addMessage({
          type: 'bot',
          content: "First, let's explore what you love. What activities make you lose track of time?"
        });
      }, 1000);
    }
  }, []);

  const addMessage = (message: { type: 'user' | 'bot'; content: string }) => {
    setMessages(prev => [...prev, message]);
  };

  const getCurrentCategory = (): keyof IkigaiData => {
    switch (phases[currentPhase].title) {
      case 'Introspection':
        return 'whatILove';
      case 'Exploration':
        return 'whatImGoodAt';
      case 'Reflection':
        return 'whatTheWorldNeeds';
      case 'Action':
        return 'whatICanBePaidFor';
      default:
        return 'whatILove'; // fallback
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput.trim();
    setUserInput('');
    addMessage({ type: 'user', content: userMessage });

    // Get the current category
    const currentCategory = getCurrentCategory();

    // Create a new answers object with the updated category
    const newAnswers = { ...answers };
    newAnswers[currentCategory] = [...(newAnswers[currentCategory] || []), userMessage];
    
    // Update the answers state
    setAnswers(newAnswers);

    // Update Ikigai chart
    onUpdateIkigai(currentCategory, newAnswers[currentCategory]);

    // Bot response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      if (currentQuestion < phases[currentPhase].questions.length - 1) {
        // Next question in current phase
        setCurrentQuestion(prev => prev + 1);
        addMessage({
          type: 'bot',
          content: phases[currentPhase].questions[currentQuestion + 1]
        });
      } else if (currentPhase < phases.length - 1) {
        // Move to next phase
        setCurrentPhase(prev => prev + 1);
        setCurrentQuestion(0);
        addMessage({
          type: 'bot',
          content: `Great! You've completed the ${phases[currentPhase].title} phase. Let's move on to ${phases[currentPhase + 1].title}.`
        });
        setTimeout(() => {
          addMessage({
            type: 'bot',
            content: phases[currentPhase + 1].questions[0]
          });
        }, 1000);
      } else {
        // All phases completed
        const summary = generateSummary(newAnswers);
        addMessage({
          type: 'bot',
          content: "Congratulations! You've completed all phases. Here's your Ikigai summary:"
        });
        setTimeout(() => {
          addMessage({
            type: 'bot',
            content: summary
          });
        }, 1000);
      }
    }, 1000);
  };

  const generateSummary = (data: IkigaiData): string => {
    const love = data.whatILove.join(', ');
    const goodAt = data.whatImGoodAt.join(', ');
    const worldNeeds = data.whatTheWorldNeeds.join(', ');
    const paidFor = data.whatICanBePaidFor.join(', ');

    return `Your Ikigai is at the intersection of:
• What you love: ${love}
• What you're good at: ${goodAt}
• What the world needs: ${worldNeeds}
• What you can be paid for: ${paidFor}

This suggests that your ideal path would be to ${generateCareerSuggestion(data)}.`;
  };

  const generateCareerSuggestion = (data: IkigaiData): string => {
    // Find common themes or create a career suggestion based on the answers
    const allAnswers = [
      ...data.whatILove,
      ...data.whatImGoodAt,
      ...data.whatTheWorldNeeds,
      ...data.whatICanBePaidFor
    ];

    // Simple suggestion based on most frequent words
    const words = allAnswers.join(' ').toLowerCase().split(/\s+/);
    const wordCount = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topWords = Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([word]) => word);

    return `focus on a career that combines ${topWords.join(', ')}`;
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "flex",
                message.type === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2",
                  message.type === 'user'
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-800"
                )}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
                <span className="animate-pulse">Typing...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your answer..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!userInput.trim()}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPhaseProgress;