import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Heart, MessageCircle, Eye, Users } from 'lucide-react';

interface EngagementMetricsProps {
  analytics: {
    avgLikes: number;
    avgComments: number;
    engagementRate: number;
    totalReach: number;
    growthRate: number;
  };
  detailed?: boolean;
}

export function EngagementMetrics({ analytics, detailed = false }: EngagementMetricsProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Mock data for detailed charts
  const weeklyEngagement = [
    { day: 'Mon', likes: 12000, comments: 280, shares: 150 },
    { day: 'Tue', likes: 15000, comments: 320, shares: 180 },
    { day: 'Wed', likes: 18000, comments: 400, shares: 220 },
    { day: 'Thu', likes: 14000, comments: 290, shares: 160 },
    { day: 'Fri', likes: 22000, comments: 480, shares: 300 },
    { day: 'Sat', likes: 19000, comments: 420, shares: 250 },
    { day: 'Sun', likes: 16000, comments: 360, shares: 200 },
  ];

  const monthlyGrowth = [
    { month: 'Jan', followers: 450000, engagement: 3.1 },
    { month: 'Feb', followers: 462000, engagement: 3.2 },
    { month: 'Mar', followers: 475000, engagement: 3.0 },
    { month: 'Apr', followers: 487200, engagement: 3.24 },
  ];

  const engagementByType = [
    { name: 'Likes', value: 75, color: '#ef4444' },
    { name: 'Comments', value: 20, color: '#3b82f6' },
    { name: 'Shares', value: 5, color: '#10b981' },
  ];

  if (detailed) {
    return (
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Likes</p>
                  <p className="text-xl font-bold">{formatNumber(analytics.avgLikes)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Comments</p>
                  <p className="text-xl font-bold">{formatNumber(analytics.avgComments)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Engagement Rate</p>
                  <p className="text-xl font-bold">{analytics.engagementRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Reach</p>
                  <p className="text-xl font-bold">{formatNumber(analytics.totalReach)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Engagement Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Engagement Trends</CardTitle>
            <CardDescription>Likes, comments, and shares over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyEngagement}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="likes" fill="#ef4444" name="Likes" />
                <Bar dataKey="comments" fill="#3b82f6" name="Comments" />
                <Bar dataKey="shares" fill="#10b981" name="Shares" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Growth & Engagement Over Time</CardTitle>
            <CardDescription>Follower growth and engagement rate trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="followers" 
                  stroke="#8884d8" 
                  name="Followers"
                  strokeWidth={3}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#82ca9d" 
                  name="Engagement %"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Distribution</CardTitle>
            <CardDescription>Breakdown of engagement types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Engagement Analytics
        </CardTitle>
        <CardDescription>
          Performance metrics and engagement insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-600">Average Likes</span>
            </div>
            <div className="text-2xl font-bold">{formatNumber(analytics.avgLikes)}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">Average Comments</span>
            </div>
            <div className="text-2xl font-bold">{formatNumber(analytics.avgComments)}</div>
          </div>
        </div>

        {/* Engagement Rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Engagement Rate</span>
            <span className="text-sm font-medium">{analytics.engagementRate}%</span>
          </div>
          <Progress value={analytics.engagementRate} className="h-2" />
          <div className="text-xs text-gray-500">
            {analytics.engagementRate > 3 ? 'Excellent' : analytics.engagementRate > 1.5 ? 'Good' : 'Needs Improvement'}
          </div>
        </div>

        {/* Growth Rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Monthly Growth Rate</span>
            <Badge variant={analytics.growthRate > 10 ? 'default' : 'secondary'}>
              +{analytics.growthRate}%
            </Badge>
          </div>
        </div>

        {/* Total Reach */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-600">Total Monthly Reach</span>
          </div>
          <div className="text-2xl font-bold">{formatNumber(analytics.totalReach)}</div>
        </div>

        {/* Quick Chart */}
        <div className="pt-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyEngagement}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="likes" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}