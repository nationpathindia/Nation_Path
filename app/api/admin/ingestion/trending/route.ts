import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🔥 Fetching trending topics from Google News India...');
    
    // Google News Top Stories for India
    const feed = await parser.parseURL('https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en');
    
    // Extract unique, meaningful topics
    const topics = feed.items
      .slice(0, 30) // Thoda bada pool lo taaki filter ke baad bhi 15 achhe topics bachein
      .map(item => {
        const title = item.title || '';
        // Remove common suffixes like "- Times of India" or "(Video)"
        const cleanTitle = title
          .replace(/\s*[-–—]\s*.*$/, '') // Remove after dash
          .replace(/\s*\(.*\)$/, '') // Remove parentheses
          .trim();
        return cleanTitle;
      })
      .filter((topic, index, self) => 
        topic && 
        topic.length > 5 && 
        topic.length < 80 &&
        self.indexOf(topic) === index // Remove duplicates
      )
      .slice(0, 15); // Top 15 unique topics

    if (topics.length > 0) {
      return NextResponse.json({ 
        success: true, 
        topics,
        lastUpdated: new Date().toISOString(),
        source: 'Google News India'
      });
    }

    // Agar feed toh aaya par topics filter hoke 0 ho gaye
    throw new Error('No valid topics found after filtering');

  } catch (error) {
    console.error('❌ Failed to fetch Google News. Switching to curated fallback topics.', error);
  }

  // ✅ FAIL-SAFE FALLBACK: Mix of National, World, and Evergreen Topics
  const fallbackTopics = [
    // 🇮🇳 National / India
    'Indian Supreme Court',
    'RBI Monetary Policy',
    'Union Budget India',
    'ISRO Latest Mission',
    'Indian Stock Market',
    'IPL Cricket Updates',
    
    // 🌍 World / International
    'US Presidential Election',
    'Middle East Conflict',
    'Global Economy Recession',
    'China Technology Ban',
    'Russia Ukraine War',
    'European Union Policy',
    
    // 🌐 Evergreen / Global Trends
    'Artificial Intelligence AI',
    'Climate Change Summit',
    'Cryptocurrency Bitcoin',
    'Space Exploration'
  ];

  // ✅ IMPORTANT: 'success: true' rakha hai taaki frontend isko render kare!
  return NextResponse.json({ 
    success: true, 
    topics: fallbackTopics,
    lastUpdated: new Date().toISOString(),
    source: 'NationPath Curated Fallback',
    isFallback: true
  });
}