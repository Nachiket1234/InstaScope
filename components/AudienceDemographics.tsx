import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Line,
  LineChart
} from 'recharts';
import { Users, Globe, Calendar, TrendingUp } from 'lucide-react';

interface AudienceDemographicsProps {
  demographics: {
    genderSplit: { male: number; female: number; other: number };
    ageGroups: { [key: string]: number };
    topCountries: { [key: string]: number };
  };
  detailed?: boolean;
}

export function AudienceDemographics({ demographics, detailed = false }: AudienceDemographicsProps) {
  // Transform data for charts
  const genderData = [
    { name: 'Female', value: demographics.genderSplit.female, color: '#ec4899' },
    { name: 'Male', value: demographics.genderSplit.male, color: '#3b82f6' },
    { name: 'Other', value: demographics.genderSplit.other, color: '#10b981' },
  ];

  const ageData = Object.entries(demographics.ageGroups).map(([age, percentage]) => ({
    age,
    percentage,
  }));

  const countryData = Object.entries(demographics.topCountries).map(([country, percentage]) => ({
    country,
    percentage,
  }));

  // Mock additional data for detailed view
  const activityByHour = [
    { hour: '0', activity: 15 },
    { hour: '2', activity: 8 },
    { hour: '4', activity: 5 },
    { hour: '6', activity: 12 },
    { hour: '8', activity: 25 },
    { hour: '10', activity: 35 },
    { hour: '12', activity: 45 },
    { hour: '14', activity: 55 },
    { hour: '16', activity: 65 },
    { hour: '18', activity: 80 },
    { hour: '20', activity: 95 },
    { hour: '22', activity: 60 },
  ];

  const interestCategories = [
    { category: 'Fashion', percentage: 85 },
    { category: 'Beauty', percentage: 78 },
    { category: 'Travel', percentage: 65 },
    { category: 'Food', percentage: 58 },
    { category: 'Fitness', percentage: 45 },
    { category: 'Technology', percentage: 32 },
  ];

  const deviceUsage = [
    { device: 'Mobile', percentage: 78, color: '#8b5cf6' },
    { device: 'Desktop', percentage: 18, color: '#06b6d4' },
    { device: 'Tablet', percentage: 4, color: '#f59e0b' },
  ];

  if (detailed) {
    return (
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Users className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Primary Gender</p>
                  <p className="text-xl font-bold">
                    {demographics.genderSplit.female > demographics.genderSplit.male ? 'Female' : 'Male'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Math.max(demographics.genderSplit.female, demographics.genderSplit.male)}% majority
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Primary Age Group</p>
                  <p className="text-xl font-bold">25-34</p>
                  <p className="text-xs text-gray-500">
                    {demographics.ageGroups['25-34']}% of audience
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Top Country</p>
                  <p className="text-xl font-bold">USA</p>
                  <p className="text-xs text-gray-500">
                    {demographics.topCountries['United States']}% of audience
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Engagement Score</p>
                  <p className="text-xl font-bold">8.7/10</p>
                  <p className="text-xs text-gray-500">Highly engaged audience</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
            <CardDescription>Audience breakdown by gender identity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-3">
                {genderData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <Badge variant="secondary">{item.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
            <CardDescription>Audience breakdown by age groups</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Top countries and regions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countryData.map((item) => (
                <div key={item.country} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.country}</span>
                    <span className="text-sm text-gray-600">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Patterns */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity Patterns</CardTitle>
            <CardDescription>When your audience is most active</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityByHour}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="activity" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Interest Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Audience Interests</CardTitle>
            <CardDescription>Content categories your audience engages with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interestCategories.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm text-gray-600">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
            <CardDescription>How your audience accesses content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={deviceUsage}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {deviceUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-3">
                {deviceUsage.map((item) => (
                  <div key={item.device} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.device}</span>
                    </div>
                    <Badge variant="secondary">{item.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Audience Demographics
        </CardTitle>
        <CardDescription>
          Insights about your follower base
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gender Split */}
        <div>
          <h4 className="font-medium mb-3">Gender Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Groups */}
        <div>
          <h4 className="font-medium mb-3">Age Groups</h4>
          <div className="space-y-2">
            {ageData.map((item) => (
              <div key={item.age} className="flex justify-between items-center">
                <span className="text-sm">{item.age}</span>
                <div className="flex items-center gap-2">
                  <Progress value={item.percentage} className="w-20 h-2" />
                  <span className="text-sm text-gray-600 w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div>
          <h4 className="font-medium mb-3">Top Countries</h4>
          <div className="space-y-2">
            {countryData.slice(0, 5).map((item) => (
              <div key={item.country} className="flex justify-between items-center">
                <span className="text-sm">{item.country}</span>
                <Badge variant="secondary">{item.percentage}%</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Insights */}
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Key Insights</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>• Predominantly female audience (72%)</p>
            <p>• Core demographic: 25-34 age group</p>
            <p>• Strong US presence (45% of followers)</p>
            <p>• High mobile engagement (78%)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}