import React, { useState, useEffect } from 'react';
import { ProfileHeader } from './components/ProfileHeader';
import { EngagementMetrics } from './components/EngagementMetrics';
import { PostsGrid } from './components/PostsGrid';
import { ReelsSection } from './components/ReelsSection';
import { AudienceDemographics } from './components/AudienceDemographics';
import { LoadingScreen } from './components/LoadingScreen';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ScrollArea } from './components/ui/scroll-area';
import { projectId, publicAnonKey } from './utils/supabase/info';

interface InfluencerData {
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
  analytics: {
    avgLikes: number;
    avgComments: number;
    engagementRate: number;
    totalReach: number;
    growthRate: number;
  };
  posts: Array<{
    id: string;
    imageUrl: string;
    caption: string;
    likes: number;
    comments: number;
    timestamp: string;
    tags: string[];
    vibe: string;
    qualityScore: number;
  }>;
  reels: Array<{
    id: string;
    thumbnailUrl: string;
    caption: string;
    views: number;
    likes: number;
    comments: number;
    timestamp: string;
    tags: string[];
    vibe: string;
  }>;
  demographics: {
    genderSplit: { male: number; female: number; other: number };
    ageGroups: { [key: string]: number };
    topCountries: { [key: string]: number };
  };
}

const MOCK_DATA: InfluencerData = {
  profile: {
    name: "Sofia Martinez",
    username: "@sofia_lifestyle",
    profilePicture: "https://images.unsplash.com/photo-1634942537034-2531766767d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBpbmZsdWVuY2VyJTIwcHJvZmlsZSUyMHdvbWFufGVufDF8fHx8MTc1OTI5OTEzNXww&ixlib=rb-4.1.0&q=80&w=400",
    followers: 487200,
    following: 1248,
    postsCount: 892,
    bio: "✨ Lifestyle & Fashion Creator ✨\n🌍 Based in Miami, FL\n📩 Collabs: sofia@email.com\n#LifestyleBlogger #Fashion #Travel",
    verified: true,
  },
  analytics: {
    avgLikes: 15420,
    avgComments: 342,
    engagementRate: 3.24,
    totalReach: 1200000,
    growthRate: 12.5,
  },
  posts: [],
  reels: [],
  demographics: {
    genderSplit: { male: 25, female: 72, other: 3 },
    ageGroups: {
      "13-17": 8,
      "18-24": 32,
      "25-34": 35,
      "35-44": 18,
      "45-54": 5,
      "55+": 2,
    },
    topCountries: {
      "United States": 45,
      "Brazil": 12,
      "Mexico": 8,
      "Canada": 7,
      "United Kingdom": 6,
      "Australia": 4,
      "Spain": 3,
      "Others": 15,
    },
  },
};

export default function App() {
  const [influencerData, setInfluencerData] = useState<InfluencerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInfluencerData();
  }, []);

  const fetchInfluencerData = async () => {
    try {
      setLoading(true);
      
      // Try to fetch from API, fallback to mock data
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-a4c6a9da/influencer/sofia_lifestyle`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setInfluencerData(data);
        } else {
          throw new Error('API not available');
        }
      } catch (apiError) {
        console.log('Using mock data:', apiError);
        // Use mock data and generate sample posts/reels
        const mockDataWithPosts = {
          ...MOCK_DATA,
          posts: await generateMockPosts(),
          reels: await generateMockReels(),
        };
        setInfluencerData(mockDataWithPosts);
      }
    } catch (error) {
      console.error('Error fetching influencer data:', error);
      setError('Failed to load influencer data');
    } finally {
      setLoading(false);
    }
  };

  const generateMockPosts = async () => {
    const postTypes = [
      { type: 'fashion', vibe: 'aesthetic', tags: ['fashion', 'style', 'ootd'] },
      { type: 'travel', vibe: 'luxury', tags: ['travel', 'vacation', 'wanderlust'] },
      { type: 'food', vibe: 'casual', tags: ['food', 'foodie', 'restaurant'] },
      { type: 'lifestyle', vibe: 'energetic', tags: ['lifestyle', 'motivation', 'selfcare'] },
      { type: 'beauty', vibe: 'aesthetic', tags: ['beauty', 'makeup', 'skincare'] },
    ];

    const posts = [];
    for (let i = 0; i < 12; i++) {
      const postType = postTypes[i % postTypes.length];
      posts.push({
        id: `post_${i + 1}`,
        imageUrl: `https://images.unsplash.com/photo-1${String(Math.floor(Math.random() * 600000000) + 500000000)}?w=400&h=400&fit=crop`,
        caption: `Amazing ${postType.type} moment! ${postType.tags.map(tag => `#${tag}`).join(' ')} ✨`,
        likes: Math.floor(Math.random() * 25000) + 8000,
        comments: Math.floor(Math.random() * 500) + 100,
        timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        tags: postType.tags,
        vibe: postType.vibe,
        qualityScore: Math.floor(Math.random() * 30) + 70,
      });
    }
    return posts;
  };

  const generateMockReels = async () => {
    const reelTypes = [
      { type: 'dance', vibe: 'energetic', tags: ['dance', 'trending', 'viral'] },
      { type: 'tutorial', vibe: 'casual', tags: ['tutorial', 'howto', 'tips'] },
      { type: 'travel', vibe: 'luxury', tags: ['travel', 'vacation', 'adventure'] },
      { type: 'comedy', vibe: 'casual', tags: ['funny', 'comedy', 'entertainment'] },
      { type: 'fashion', vibe: 'aesthetic', tags: ['fashion', 'style', 'outfit'] },
    ];

    const reels = [];
    for (let i = 0; i < 8; i++) {
      const reelType = reelTypes[i % reelTypes.length];
      reels.push({
        id: `reel_${i + 1}`,
        thumbnailUrl: `https://images.unsplash.com/photo-1${String(Math.floor(Math.random() * 600000000) + 500000000)}?w=300&h=500&fit=crop`,
        caption: `${reelType.type} vibes! ${reelType.tags.map(tag => `#${tag}`).join(' ')} 🔥`,
        views: Math.floor(Math.random() * 500000) + 50000,
        likes: Math.floor(Math.random() * 15000) + 3000,
        comments: Math.floor(Math.random() * 300) + 50,
        timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        tags: reelType.tags,
        vibe: reelType.vibe,
      });
    }
    return reels;
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !influencerData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'Failed to load data'}</p>
          <button 
            onClick={fetchInfluencerData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <ProfileHeader profile={influencerData.profile} />
        
        <div className="mt-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="reels">Reels</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <EngagementMetrics analytics={influencerData.analytics} />
                </div>
                <div>
                  <AudienceDemographics demographics={influencerData.demographics} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="posts" className="mt-6">
              <PostsGrid posts={influencerData.posts} />
            </TabsContent>
            
            <TabsContent value="reels" className="mt-6">
              <ReelsSection reels={influencerData.reels} />
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-6">
              <EngagementMetrics analytics={influencerData.analytics} detailed={true} />
            </TabsContent>
            
            <TabsContent value="audience" className="mt-6">
              <AudienceDemographics demographics={influencerData.demographics} detailed={true} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}