import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, TrendingUp, Users, Filter, BarChart2, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PeerComparisonProps {
  userData: {
    technicalSkills: number;
    projectExperience: number;
    industryKnowledge: number;
    problemSolving: number;
    communicationSkills: number;
    learningVelocity: number;
  };
}

const timeRanges = [
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_quarter', label: 'Last Quarter' },
  { value: 'last_year', label: 'Last Year' },
];

const experienceLevels = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (2-5 years)' },
  { value: 'senior', label: 'Senior Level (5+ years)' },
];

const industries = [
  { value: 'tech', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'retail', label: 'Retail' },
];

type ChartType = 'bar' | 'line' | 'pie';

const PeerComparison: React.FC<PeerComparisonProps> = ({ userData }) => {
  const [timeRange, setTimeRange] = useState('last_month');
  const [experienceLevel, setExperienceLevel] = useState('mid');
  const [selectedIndustries, setSelectedIndustries] = useState(['tech']);
  const [showPremiumInsights, setShowPremiumInsights] = useState(false);
  const [chartType, setChartType] = useState<ChartType>('bar');

  const data = [
    {
      name: 'Technical Skills',
      You: userData.technicalSkills,
      'Peer Average': 75,
      'Top 10%': 90,
    },
    {
      name: 'Project Experience',
      You: userData.projectExperience,
      'Peer Average': 70,
      'Top 10%': 85,
    },
    {
      name: 'Industry Knowledge',
      You: userData.industryKnowledge,
      'Peer Average': 65,
      'Top 10%': 88,
    },
    {
      name: 'Problem Solving',
      You: userData.problemSolving,
      'Peer Average': 72,
      'Top 10%': 92,
    },
    {
      name: 'Communication',
      You: userData.communicationSkills,
      'Peer Average': 68,
      'Top 10%': 86,
    },
    {
      name: 'Learning Velocity',
      You: userData.learningVelocity,
      'Peer Average': 70,
      'Top 10%': 89,
    },
  ];

  // Transform data for pie chart
  const pieData = [
    {
      name: 'Technical Skills',
      value: userData.technicalSkills,
    },
    {
      name: 'Project Experience',
      value: userData.projectExperience,
    },
    {
      name: 'Industry Knowledge',
      value: userData.industryKnowledge,
    },
    {
      name: 'Problem Solving',
      value: userData.problemSolving,
    },
    {
      name: 'Communication',
      value: userData.communicationSkills,
    },
    {
      name: 'Learning Velocity',
      value: userData.learningVelocity,
    },
  ];

  const COLORS = ['#9333ea', '#6366f1', '#22c55e', '#ec4899', '#f59e0b', '#06b6d4'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span>{entry.name}: {entry.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: payload[0].color }}
            />
            <span>Score: {payload[0].value}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="You"
              stroke="#9333ea"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="Peer Average"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            {showPremiumInsights && (
              <Line
                type="monotone"
                dataKey="Top 10%"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            )}
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<PieChartTooltip />} />
            <Legend />
          </PieChart>
        );
      default:
        return (
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="You" fill="#9333ea" />
            <Bar dataKey="Peer Average" fill="#6366f1" />
            {showPremiumInsights && (
              <Bar dataKey="Top 10%" fill="#22c55e" />
            )}
          </BarChart>
        );
    }
  };

  const handleIndustryToggle = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Where You Stand</CardTitle>
            <CardDescription>
              Your performance compared to marketplace peers
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowPremiumInsights(!showPremiumInsights)}
          >
            <Lock className="h-4 w-4" />
            Premium Insights
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart Type and Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 border rounded-lg p-1">
              <Button
                variant={chartType === 'bar' ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
                onClick={() => setChartType('bar')}
              >
                <BarChart2 className="h-4 w-4" />
                Bar
              </Button>
              <Button
                variant={chartType === 'line' ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
                onClick={() => setChartType('line')}
              >
                <LineChartIcon className="h-4 w-4" />
                Line
              </Button>
              <Button
                variant={chartType === 'pie' ? 'default' : 'ghost'}
                size="sm"
                className="gap-2"
                onClick={() => setChartType('pie')}
              >
                <PieChartIcon className="h-4 w-4" />
                Pie
              </Button>
            </div>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map(level => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Industries
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Industries</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {industries.map(industry => (
                  <DropdownMenuCheckboxItem
                    key={industry.value}
                    checked={selectedIndustries.includes(industry.value)}
                    onCheckedChange={() => handleIndustryToggle(industry.value)}
                  >
                    {industry.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-lg font-semibold">Top 25%</span>
                </div>
                <p className="text-sm text-muted-foreground">Overall Ranking</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-lg font-semibold">1,234</span>
                </div>
                <p className="text-sm text-muted-foreground">Peers Compared</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">+15%</Badge>
                  <span className="text-sm text-muted-foreground">vs Last Month</span>
                </div>
                <p className="text-sm text-muted-foreground">Growth Rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>

          {/* Premium Features Teaser */}
          {!showPremiumInsights && (
            <div className="mt-4 p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4" />
                <span className="font-semibold">Premium Features</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Unlock advanced insights including:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside">
                <li>Top 10% performer benchmarks</li>
                <li>Detailed skill gap analysis</li>
                <li>Personalized improvement recommendations</li>
                <li>Industry-specific insights</li>
              </ul>
            </div>
          )}

          <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            <p>Based on analysis of {showPremiumInsights ? '5,000+' : '1,000+'} AI/ML professionals in your experience range</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerComparison; 