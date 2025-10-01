import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-a4c6a9da/health", (c) => {
  return c.json({ status: "ok" });
});

// Instagram Influencer API endpoints
app.get("/make-server-a4c6a9da/influencer/:username", async (c) => {
  try {
    const username = c.req.param("username");
    console.log(`Fetching influencer data for: ${username}`);
    
    // Try to get cached data first
    const cachedData = await kv.get(`influencer:${username}`);
    if (cachedData) {
      console.log("Returning cached influencer data");
      return c.json(cachedData);
    }

    // If no cached data, return mock data for demo
    const mockInfluencerData = await generateMockInfluencerData(username);
    
    // Cache the data for 1 hour
    await kv.set(`influencer:${username}`, mockInfluencerData);
    
    return c.json(mockInfluencerData);
  } catch (error) {
    console.error("Error fetching influencer data:", error);
    return c.json({ error: "Failed to fetch influencer data" }, 500);
  }
});

app.post("/make-server-a4c6a9da/influencer/:username/scrape", async (c) => {
  try {
    const username = c.req.param("username");
    console.log(`Starting scrape for influencer: ${username}`);
    
    // In a real implementation, this would trigger the scraping pipeline
    // For demo purposes, we'll simulate the scraping process
    const scrapedData = await simulateInstagramScraping(username);
    
    // Store the scraped data
    await kv.set(`influencer:${username}`, scrapedData);
    await kv.set(`scrape_status:${username}`, { 
      status: "completed", 
      timestamp: new Date().toISOString(),
      postsScraped: scrapedData.posts.length,
      reelsScraped: scrapedData.reels.length
    });
    
    return c.json({ 
      success: true, 
      message: "Scraping completed successfully",
      data: scrapedData
    });
  } catch (error) {
    console.error("Error during scraping:", error);
    await kv.set(`scrape_status:${username}`, { 
      status: "failed", 
      timestamp: new Date().toISOString(),
      error: error.message
    });
    return c.json({ error: "Scraping failed" }, 500);
  }
});

app.get("/make-server-a4c6a9da/influencer/:username/analytics", async (c) => {
  try {
    const username = c.req.param("username");
    console.log(`Generating analytics for: ${username}`);
    
    const influencerData = await kv.get(`influencer:${username}`);
    if (!influencerData) {
      return c.json({ error: "Influencer data not found" }, 404);
    }
    
    const analytics = generateAdvancedAnalytics(influencerData);
    
    return c.json(analytics);
  } catch (error) {
    console.error("Error generating analytics:", error);
    return c.json({ error: "Failed to generate analytics" }, 500);
  }
});

app.post("/make-server-a4c6a9da/influencer/:username/analyze-content", async (c) => {
  try {
    const username = c.req.param("username");
    const body = await c.req.json();
    console.log(`Analyzing content for: ${username}`);
    
    // Simulate AI-powered content analysis
    const analysisResults = await performContentAnalysis(body.contentUrls || []);
    
    // Store analysis results
    await kv.set(`content_analysis:${username}:${Date.now()}`, analysisResults);
    
    return c.json({
      success: true,
      analysis: analysisResults
    });
  } catch (error) {
    console.error("Error analyzing content:", error);
    return c.json({ error: "Content analysis failed" }, 500);
  }
});

// Helper functions for mock data generation and analysis
async function generateMockInfluencerData(username: string) {
  const mockData = {
    profile: {
      name: "Sofia Martinez",
      username: `@${username}`,
      profilePicture: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400",
      followers: Math.floor(Math.random() * 500000) + 100000,
      following: Math.floor(Math.random() * 2000) + 500,
      postsCount: Math.floor(Math.random() * 1000) + 200,
      bio: "✨ Lifestyle & Fashion Creator ✨\n🌍 Based in Miami, FL\n📩 Collabs: sofia@email.com",
      verified: Math.random() > 0.5,
    },
    analytics: {
      avgLikes: Math.floor(Math.random() * 20000) + 5000,
      avgComments: Math.floor(Math.random() * 500) + 100,
      engagementRate: Number((Math.random() * 5 + 1).toFixed(2)),
      totalReach: Math.floor(Math.random() * 2000000) + 500000,
      growthRate: Number((Math.random() * 20 + 5).toFixed(1)),
    },
    posts: await generateMockPosts(),
    reels: await generateMockReels(),
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
    lastUpdated: new Date().toISOString(),
  };
  
  return mockData;
}

async function generateMockPosts() {
  const postTypes = [
    { type: 'fashion', vibe: 'aesthetic', tags: ['fashion', 'style', 'ootd'] },
    { type: 'travel', vibe: 'luxury', tags: ['travel', 'vacation', 'wanderlust'] },
    { type: 'food', vibe: 'casual', tags: ['food', 'foodie', 'restaurant'] },
    { type: 'lifestyle', vibe: 'energetic', tags: ['lifestyle', 'motivation', 'selfcare'] },
    { type: 'beauty', vibe: 'aesthetic', tags: ['beauty', 'makeup', 'skincare'] },
  ];

  const posts = [];
  for (let i = 0; i < 15; i++) {
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
}

async function generateMockReels() {
  const reelTypes = [
    { type: 'dance', vibe: 'energetic', tags: ['dance', 'trending', 'viral'] },
    { type: 'tutorial', vibe: 'casual', tags: ['tutorial', 'howto', 'tips'] },
    { type: 'travel', vibe: 'luxury', tags: ['travel', 'vacation', 'adventure'] },
    { type: 'comedy', vibe: 'casual', tags: ['funny', 'comedy', 'entertainment'] },
    { type: 'fashion', vibe: 'aesthetic', tags: ['fashion', 'style', 'outfit'] },
  ];

  const reels = [];
  for (let i = 0; i < 10; i++) {
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
}

async function simulateInstagramScraping(username: string) {
  console.log(`Simulating Instagram scraping for ${username}...`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate fresh data as if scraped from Instagram
  return await generateMockInfluencerData(username);
}

function generateAdvancedAnalytics(influencerData: any) {
  const posts = influencerData.posts || [];
  const reels = influencerData.reels || [];
  
  return {
    contentAnalysis: {
      postPerformance: posts.map((post: any) => ({
        id: post.id,
        engagementRate: ((post.likes + post.comments) / influencerData.profile.followers * 100).toFixed(2),
        viralPotential: post.likes > influencerData.analytics.avgLikes * 1.5 ? 'high' : 'normal',
        optimalPostingTime: '6:00 PM',
      })),
      contentCategories: {
        fashion: posts.filter((p: any) => p.tags.includes('fashion')).length,
        travel: posts.filter((p: any) => p.tags.includes('travel')).length,
        food: posts.filter((p: any) => p.tags.includes('food')).length,
        lifestyle: posts.filter((p: any) => p.tags.includes('lifestyle')).length,
      },
      avgQualityScore: posts.reduce((sum: number, post: any) => sum + post.qualityScore, 0) / posts.length,
    },
    reelAnalysis: {
      totalViews: reels.reduce((sum: any, reel: any) => sum + reel.views, 0),
      avgEngagementRate: reels.reduce((sum: any, reel: any) => sum + ((reel.likes + reel.comments) / reel.views * 100), 0) / reels.length,
      topPerformingVibe: reels.reduce((acc: any, reel: any) => {
        acc[reel.vibe] = (acc[reel.vibe] || 0) + reel.views;
        return acc;
      }, {}),
    },
    audienceInsights: {
      engagementByTimeOfDay: generateEngagementByHour(),
      contentPreferences: analyzeContentPreferences(posts),
      growthProjection: calculateGrowthProjection(influencerData.analytics),
    }
  };
}

function generateEngagementByHour() {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    engagement: Math.floor(Math.random() * 100) + 20,
  }));
}

function analyzeContentPreferences(posts: any[]) {
  const preferences = posts.reduce((acc: any, post: any) => {
    post.tags.forEach((tag: string) => {
      acc[tag] = (acc[tag] || 0) + post.likes + post.comments;
    });
    return acc;
  }, {});
  
  return Object.entries(preferences)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 5)
    .map(([tag, engagement]) => ({ tag, engagement }));
}

function calculateGrowthProjection(analytics: any) {
  const currentGrowth = analytics.growthRate;
  return {
    oneMonth: Math.floor(analytics.totalReach * (1 + currentGrowth / 100)),
    threeMonth: Math.floor(analytics.totalReach * Math.pow(1 + currentGrowth / 100, 3)),
    sixMonth: Math.floor(analytics.totalReach * Math.pow(1 + currentGrowth / 100, 6)),
  };
}

async function performContentAnalysis(contentUrls: string[]) {
  console.log(`Analyzing ${contentUrls.length} pieces of content...`);
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    analysisComplete: true,
    processedItems: contentUrls.length,
    insights: {
      averageQuality: Math.floor(Math.random() * 30) + 70,
      dominantColors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
      emotionalTone: ['positive', 'energetic', 'aspirational'][Math.floor(Math.random() * 3)],
      brandConsistency: Math.floor(Math.random() * 40) + 60,
      recommendations: [
        'Increase posting consistency for better engagement',
        'Use more lifestyle content to boost audience connection',
        'Optimize posting times based on audience activity',
        'Incorporate trending hashtags for better discoverability'
      ]
    },
    timestamp: new Date().toISOString()
  };
}

Deno.serve(app.fetch);