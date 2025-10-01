import React from 'react';
import { Card, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Progress } from './ui/progress';

export function LoadingScreen() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 animate-pulse"></div>
          <h2 className="text-2xl font-bold mb-2">Loading Influencer Profile</h2>
          <p className="text-gray-600 mb-4">Analyzing data and generating insights...</p>
          <Progress value={progress} className="w-full max-w-md mx-auto" />
        </div>

        {/* Profile Header Skeleton */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="flex-1 space-y-4">
                <div>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div className="flex gap-8">
                  <div className="text-center">
                    <Skeleton className="h-6 w-12 mb-1" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-6 w-12 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="text-center">
                    <Skeleton className="h-6 w-12 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full max-w-md" />
                  <Skeleton className="h-4 w-3/4 max-w-xs" />
                  <Skeleton className="h-4 w-1/2 max-w-xs" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="h-10 w-20" />
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 flex-1" />
            ))}
          </div>

          {/* Content Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="w-5 h-5" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="w-5 h-5" />
                    <Skeleton className="h-6 w-36" />
                  </div>
                  <Skeleton className="h-40 w-full" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-10" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Posts Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Skeleton className="w-full aspect-square" />
                  <div className="p-3 space-y-2">
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-12" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Loading Messages */}
        <div className="text-center mt-8 space-y-2">
          <div className="text-sm text-gray-500 space-y-1">
            <p>📸 Processing images and extracting insights...</p>
            <p>🎥 Analyzing video content and engagement...</p>
            <p>📊 Calculating audience demographics...</p>
            <p>✨ Generating AI-powered recommendations...</p>
          </div>
        </div>
      </div>
    </div>
  );
}