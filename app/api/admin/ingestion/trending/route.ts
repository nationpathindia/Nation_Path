import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Google News Top Stories for India
    const feed = await parser.parseURL('https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en');
    
    // Extract unique, meaningful topics
    const topics = feed.items
      .slice(0, 25)
      .map(item => {
        const title = item.title || '';
        // Remove common suffixes
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
      .slice(0, 15);

    if (topics.length > 0) {
      return NextResponse.json({ 
        success: true, 
        topics,
        lastUpdated: new Date().toISOString(),
        source: 'Google News India'
      });
    }

  } catch (error) {
    console.error('Failed to fetch Google News:', error);
  }

  // Fallback topics
  const fallbackTopics = [
    'Election 2024',
    'RBI Policy',
    'Union Budget',
    'Supreme Court',
    'ISRO Mission',
    'Stock Market',
    'IPL Cricket',
    'Bitcoin',
    'Climate Change',
    'AI Technology',
    'Healthcare',
    'Education Reform',
    'Infrastructure',
    'Startups',
    'Agriculture'
  ];

  return NextResponse.json({ 
    success: false, 
    topics: fallbackTopics,
    lastUpdated: new Date().toISOString(),
    source: 'NationPath Curated'
  });
}