import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Verified, UserPlus, MessageCircle, Share } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileHeaderProps {
  profile: {
    name: string;
    username: string;
    profilePicture: string;
    followers: number;
    following: number;
    postsCount: number;
    bio: string;
    verified: boolean;
  };
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <Avatar className="w-32 h-32 border-4 border-gradient-to-r from-purple-500 to-pink-500 p-1">
              <AvatarImage 
                src={profile.profilePicture} 
                alt={profile.name}
                className="rounded-full"
              />
              <AvatarFallback className="text-xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            {/* Name and Username */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                {profile.verified && (
                  <Verified className="w-6 h-6 text-blue-500 fill-current" />
                )}
              </div>
              <p className="text-gray-600 text-lg">{profile.username}</p>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-xl font-bold">{formatNumber(profile.postsCount)}</div>
                <div className="text-sm text-gray-600">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{formatNumber(profile.followers)}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{formatNumber(profile.following)}</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
            </div>

            {/* Bio */}
            <div className="max-w-md">
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {profile.bio}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Follow
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Message
              </Button>
              <Button variant="outline" size="icon">
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Profile Badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary">Lifestyle Creator</Badge>
          <Badge variant="secondary">Fashion Influencer</Badge>
          <Badge variant="secondary">Brand Partner</Badge>
          {profile.verified && <Badge variant="default">Verified Account</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}