import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface IkigaiData {
  whatILove: string[];
  whatImGoodAt: string[];
  whatTheWorldNeeds: string[];
  whatICanBePaidFor: string[];
  summary?: string;
}

interface LiveIkigaiChartProps {
  email: string;
  data: IkigaiData;
  activeSection?: keyof IkigaiData | null;
  onSectionComplete?: (section: keyof IkigaiData) => void;
}

const LiveIkigaiChart: React.FC<LiveIkigaiChartProps> = ({ 
  email, 
  data,
  activeSection,
  onSectionComplete 
}) => {
  const {
    whatILove = [],
    whatImGoodAt = [],
    whatTheWorldNeeds = [],
    whatICanBePaidFor = [],
    summary = ''
  } = data || {};

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Ikigai Journey</CardTitle>
        <CardDescription>
          Discover your perfect balance of passion, mission, profession, and vocation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-square max-w-2xl mx-auto">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            style={{ transform: 'rotate(0deg)' }}
          >
            {/* What I LOVE Circle */}
            <circle
              cx="200"
              cy="150"
              r="120"
              fill="#fde68a"
              fillOpacity="0.5"
              className="transition-all duration-300 hover:fill-opacity-70"
            />
            <text x="200" y="80" textAnchor="middle" className="font-semibold text-sm">
              What I LOVE
            </text>

            {/* What I'm GOOD AT Circle */}
            <circle
              cx="120"
              cy="220"
              r="120"
              fill="#bbf7d0"
              fillOpacity="0.5"
              className="transition-all duration-300 hover:fill-opacity-70"
            />
            <text x="50" y="220" textAnchor="middle" className="font-semibold text-sm">
              What I'm
            </text>
            <text x="50" y="240" textAnchor="middle" className="font-semibold text-sm">
              GOOD AT
            </text>

            {/* What the world NEEDS Circle */}
            <circle
              cx="280"
              cy="220"
              r="120"
              fill="#fbcfe8"
              fillOpacity="0.5"
              className="transition-all duration-300 hover:fill-opacity-70"
            />
            <text x="350" y="220" textAnchor="middle" className="font-semibold text-sm">
              What the world
            </text>
            <text x="350" y="240" textAnchor="middle" className="font-semibold text-sm">
              NEEDS
            </text>

            {/* What I can be PAID for Circle */}
            <circle
              cx="200"
              cy="290"
              r="120"
              fill="#bae6fd"
              fillOpacity="0.5"
              className="transition-all duration-300 hover:fill-opacity-70"
            />
            <text x="200" y="380" textAnchor="middle" className="font-semibold text-sm">
              What I can be PAID for
            </text>

            {/* Intersection Labels */}
            <text x="200" y="150" textAnchor="middle" className="font-medium text-sm fill-emerald-700">
              Passion
            </text>
            <text x="280" y="185" textAnchor="middle" className="font-medium text-sm fill-pink-700">
              Mission
            </text>
            <text x="120" y="185" textAnchor="middle" className="font-medium text-sm fill-emerald-700">
              Profession
            </text>
            <text x="200" y="255" textAnchor="middle" className="font-medium text-sm fill-blue-700">
              Vocation
            </text>

            {/* Center - Ikigai */}
            <text x="200" y="220" textAnchor="middle" className="font-bold text-base">
              Ikigai
            </text>

            {/* Outer descriptions */}
            <g className="text-xs fill-gray-600">
              <text x="50" y="120" textAnchor="middle">
                Satisfaction, but
              </text>
              <text x="50" y="135" textAnchor="middle">
                feeling of uselessness
              </text>

              <text x="350" y="120" textAnchor="middle">
                Delight and
              </text>
              <text x="350" y="135" textAnchor="middle">
                fullness, but no wealth
              </text>

              <text x="50" y="320" textAnchor="middle">
                Comfortable, but
              </text>
              <text x="50" y="335" textAnchor="middle">
                feeling of emptiness
              </text>

              <text x="350" y="320" textAnchor="middle">
                Excitement and
              </text>
              <text x="350" y="335" textAnchor="middle">
                complacency, but
              </text>
              <text x="350" y="350" textAnchor="middle">
                sense of uncertainty
              </text>
            </g>
          </svg>

          {/* Interactive Tooltips */}
          <div className="absolute inset-0">
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity bg-white p-2 rounded-lg shadow-lg text-sm">
              <strong>What I Love:</strong>
              <ul className="list-disc list-inside">
                {whatILove.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="absolute top-1/2 left-[15%] -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity bg-white p-2 rounded-lg shadow-lg text-sm">
              <strong>What I'm Good At:</strong>
              <ul className="list-disc list-inside">
                {whatImGoodAt.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="absolute top-1/2 right-[15%] -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity bg-white p-2 rounded-lg shadow-lg text-sm">
              <strong>What the World Needs:</strong>
              <ul className="list-disc list-inside">
                {whatTheWorldNeeds.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity bg-white p-2 rounded-lg shadow-lg text-sm">
              <strong>What I Can Be Paid For:</strong>
              <ul className="list-disc list-inside">
                {whatICanBePaidFor.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <p className="text-center">
            Hover over each circle to see your personal attributes in each category.
            Your Ikigai lies at the intersection of all four elements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveIkigaiChart;
