
import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for skills radar chart
const skills = [
  { subject: 'Python', A: 85, fullMark: 100 },
  { subject: 'Machine Learning', A: 75, fullMark: 100 },
  { subject: 'Data Analysis', A: 80, fullMark: 100 },
  { subject: 'Deep Learning', A: 65, fullMark: 100 },
  { subject: 'NLP', A: 60, fullMark: 100 },
  { subject: 'Cloud Computing', A: 70, fullMark: 100 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border shadow-sm rounded-md">
        <p className="text-xs">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const SkillsRadarChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Skills Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--foreground)', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'var(--foreground)' }} />
              <Tooltip content={<CustomTooltip />} />
              <Radar
                name="Skill Level"
                dataKey="A"
                stroke="var(--career-purple)"
                fill="var(--career-purple)"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsRadarChart;
