import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { AspectRatio } from './ui/aspect-ratio';
import { Play, Heart, MessageCircle, Share, Eye, Calendar, Zap, Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Reel {
  id: string;
  thumbnailUrl: string;
  caption: string;
  views: number;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
  vibe: string;
}

interface ReelsSectionProps {
  reels: Reel[];
}

export function ReelsSection({ reels }: ReelsSectionProps) {
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getVibeColor = (vibe: string): string => {
    switch (vibe) {
      case 'energetic': return 'bg-red-100 text-red-800';
      case 'luxury': return 'bg-yellow-100 text-yellow-800';
      case 'casual': return 'bg-green-100 text-green-800';
      case 'aesthetic': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEngagementRate = (views: number, likes: number, comments: number): number => {
    return ((likes + comments) / views * 100);
  };

  const uniqueVibes = Array.from(new Set(reels.map(reel => reel.vibe)));
  const uniqueTags = Array.from(new Set(reels.flatMap(reel => reel.tags)));

  const filteredReels = reels.filter(reel => {
    if (filter === 'all') return true;
    return reel.tags.includes(filter) || reel.vibe === filter;
  });

  // Mock vertical video thumbnails
  const sampleThumbnails = [
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&h=500&fit=crop",
    "https://images.unsplash.com/photo-1694878982074-d8d4bc4581b9?w=300&h=500&fit=crop",
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=500&fit=crop",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=500&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=500&fit=crop",
    "https://images.unsplash.com/photo-1506629905333-baa1c3a9e2b7?w=300&h=500&fit=crop",
  ];

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All Reels
        </Button>
        {uniqueVibes.map(vibe => (
          <Button
            key={vibe}
            variant={filter === vibe ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(vibe)}
            className="capitalize"
          >
            {vibe}
          </Button>
        ))}
        {uniqueTags.slice(0, 4).map(tag => (
          <Button
            key={tag}
            variant={filter === tag ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(tag)}
            className="capitalize"
          >
            #{tag}
          </Button>
        ))}
      </div>

      {/* Reels Analytics Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatNumber(reels.reduce((sum, reel) => sum + reel.views, 0))}
              </div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {formatNumber(reels.reduce((sum, reel) => sum + reel.likes, 0))}
              </div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatNumber(reels.reduce((sum, reel) => sum + reel.comments, 0))}
              </div>
              <div className="text-sm text-gray-600">Total Comments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(reels.reduce((sum, reel) => sum + getEngagementRate(reel.views, reel.likes, reel.comments), 0) / reels.length).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Avg Engagement</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reels Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredReels.map((reel, index) => {
          const thumbnailUrl = sampleThumbnails[index % sampleThumbnails.length];
          const engagementRate = getEngagementRate(reel.views, reel.likes, reel.comments);
          
          return (
            <Dialog key={reel.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden group">
                  <CardContent className="p-0">
                    <AspectRatio ratio={9/16}>
                      <ImageWithFallback
                        src={thumbnailUrl}
                        alt={reel.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-black ml-1" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                        <div className="text-white space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Eye className="w-3 h-3" />
                            <span>{formatNumber(reel.views)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              <span>{formatNumber(reel.likes)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{formatNumber(reel.comments)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Vibe Badge */}
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className={`${getVibeColor(reel.vibe)} text-xs`}>
                          {reel.vibe}
                        </Badge>
                      </div>
                    </AspectRatio>
                  </CardContent>
                </Card>
              </DialogTrigger>
              
              <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Reel Analysis</DialogTitle>
                  <DialogDescription>
                    Detailed performance and insights for this reel
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Reel Preview */}
                  <div className="lg:col-span-1">
                    <AspectRatio ratio={9/16}>
                      <ImageWithFallback
                        src={thumbnailUrl}
                        alt={reel.caption}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-black ml-1" />
                        </div>
                      </div>
                    </AspectRatio>
                  </div>
                  
                  {/* Reel Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Caption</h3>
                      <p className="text-gray-700">{reel.caption}</p>
                    </div>
                    
                    {/* Performance Metrics */}
                    <div>
                      <h4 className="font-medium mb-3">Performance Metrics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <Eye className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                          <div className="font-semibold">{formatNumber(reel.views)}</div>
                          <div className="text-xs text-gray-600">Views</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <Heart className="w-6 h-6 text-red-600 mx-auto mb-1" />
                          <div className="font-semibold">{formatNumber(reel.likes)}</div>
                          <div className="text-xs text-gray-600">Likes</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <MessageCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                          <div className="font-semibold">{formatNumber(reel.comments)}</div>
                          <div className="text-xs text-gray-600">Comments</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <Zap className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                          <div className="font-semibold">{engagementRate.toFixed(1)}%</div>
                          <div className="text-xs text-gray-600">Engagement</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Analysis */}
                    <div>
                      <h4 className="font-medium mb-3">Video Analysis</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Vibe:</span>
                          <Badge className={getVibeColor(reel.vibe)}>
                            {reel.vibe}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{formatDate(reel.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Performance:</span>
                          <Badge variant={engagementRate > 5 ? 'default' : engagementRate > 2 ? 'secondary' : 'destructive'}>
                            {engagementRate > 5 ? 'High Performing' : engagementRate > 2 ? 'Good' : 'Needs Improvement'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div>
                      <h4 className="font-medium mb-2">Tags & Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        {reel.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* AI Insights */}
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">AI Video Insights</h4>
                      <div className="text-sm text-gray-700 space-y-2">
                        <p>• Optimal length for engagement retention</p>
                        <p>• Strong hook in the first 3 seconds</p>
                        <p>• High-quality audio and visual production</p>
                        <p>• Trending music enhances reach potential</p>
                        <p>• Content style aligns with audience preferences</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>

      {filteredReels.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No reels found with the selected filter.</p>
          <Button
            variant="outline"
            onClick={() => setFilter('all')}
            className="mt-2"
          >
            Show All Reels
          </Button>
        </div>
      )}
    </div>
  );
}