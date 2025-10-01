import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { AspectRatio } from './ui/aspect-ratio';
import { Heart, MessageCircle, Share, Calendar, Star, Tag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
  vibe: string;
  qualityScore: number;
}

interface PostsGridProps {
  posts: Post[];
}

export function PostsGrid({ posts }: PostsGridProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
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
      case 'aesthetic': return 'bg-purple-100 text-purple-800';
      case 'luxury': return 'bg-yellow-100 text-yellow-800';
      case 'casual': return 'bg-green-100 text-green-800';
      case 'energetic': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQualityBadge = (score: number): { label: string; variant: 'default' | 'secondary' | 'destructive' } => {
    if (score >= 90) return { label: 'Excellent', variant: 'default' };
    if (score >= 80) return { label: 'Good', variant: 'secondary' };
    if (score >= 70) return { label: 'Average', variant: 'secondary' };
    return { label: 'Needs Work', variant: 'destructive' };
  };

  const uniqueTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  const uniqueVibes = Array.from(new Set(posts.map(post => post.vibe)));

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.tags.includes(filter) || post.vibe === filter;
  });

  // Mock image URLs for consistent display
  const sampleImages = [
    "https://images.unsplash.com/photo-1614714053570-6c6b6aa54a6d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1690303472493-c21e659b5abf?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=400&fit=crop",
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
          All Posts
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
        {uniqueTags.slice(0, 5).map(tag => (
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

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPosts.map((post, index) => {
          const imageUrl = sampleImages[index % sampleImages.length];
          const quality = getQualityBadge(post.qualityScore);
          
          return (
            <Dialog key={post.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden group">
                  <CardContent className="p-0">
                    <AspectRatio ratio={1}>
                      <ImageWithFallback
                        src={imageUrl}
                        alt={post.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-4 text-white">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{formatNumber(post.likes)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">{formatNumber(post.comments)}</span>
                          </div>
                        </div>
                      </div>
                    </AspectRatio>
                    
                    <div className="p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="secondary" className={getVibeColor(post.vibe)}>
                          {post.vibe}
                        </Badge>
                        <Badge variant={quality.variant}>
                          {quality.label}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {post.caption}
                      </p>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>{formatDate(post.timestamp)}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          <span>{post.qualityScore}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Post Details</DialogTitle>
                  <DialogDescription>
                    Detailed analysis and insights for this post
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Post Image */}
                  <div>
                    <AspectRatio ratio={1}>
                      <ImageWithFallback
                        src={imageUrl}
                        alt={post.caption}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </AspectRatio>
                  </div>
                  
                  {/* Post Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Caption</h3>
                      <p className="text-gray-700">{post.caption}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-600">Likes</h4>
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="font-semibold">{formatNumber(post.likes)}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-600">Comments</h4>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold">{formatNumber(post.comments)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-600 mb-2">Post Analysis</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Vibe:</span>
                          <Badge className={getVibeColor(post.vibe)}>
                            {post.vibe}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Quality Score:</span>
                          <Badge variant={quality.variant}>
                            {post.qualityScore}/100 - {quality.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{formatDate(post.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-600 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-sm text-gray-600 mb-2">AI Insights</h4>
                      <div className="text-sm text-gray-700 space-y-2">
                        <p>• High engagement potential based on visual composition</p>
                        <p>• Optimal posting time for maximum reach</p>
                        <p>• Content aligns with follower preferences</p>
                        <p>• Consistent with brand aesthetic</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No posts found with the selected filter.</p>
          <Button
            variant="outline"
            onClick={() => setFilter('all')}
            className="mt-2"
          >
            Show All Posts
          </Button>
        </div>
      )}
    </div>
  );
}