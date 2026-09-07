import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Parser from 'rss-parser';

const parser = new Parser();

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic required' }, { status: 400 });
    }

    console.log(`🔍 Auto-fetching news for topic: "${topic}"`);

    // Google News Search RSS for the specific topic
    const searchQuery = encodeURIComponent(topic);
    const feed = await parser.parseURL(
      `https://news.google.com/rss/search?q=${searchQuery}&hl=en-IN&gl=IN&ceid=IN:en`
    );

    let addedCount = 0;

    // Top 15 results fetch karo
   for (const item of feed.items.slice(0, 15)) {
  const link = item.link || item.guid || '';
  if (!link) continue;

  // Duplicate check
  const exists = await prisma.ingestedFeed.findUnique({
    where: { sourceUrl: link }
  });

  if (exists) continue;

  // ✅ NEW: Sirf last 24 hours ki news lo
  const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  if (pubDate < last24Hours) {
    console.log(`Skipping old news: ${item.title}`);
    continue; // 24 hours se purani news skip karo
  }

  // Priority score calculate karo
  const textToCheck = `${item.title} ${item.contentSnippet}`.toLowerCase();
  const topicWords = topic.toLowerCase().split(/\s+/).filter(w => w.length > 4);
  const matchedKeywords = topicWords.filter(word => textToCheck.includes(word));
  
  const score = 80 + (matchedKeywords.length * 10);

  // Database mein save karo
  await prisma.ingestedFeed.create({
    data: {
      sourceId: null,
      title: item.title || 'Untitled',
      description: item.contentSnippet || item.content || 'No description',
      sourceUrl: link,
      imageUrl: (item as any).enclosure?.url || null,
      priorityScore: score,
      keywords: matchedKeywords,
      status: 'pending',
      publishedAt: pubDate,
    }
  });

  addedCount++;
}

    console.log(`✅ Successfully added ${addedCount} news items for topic: "${topic}"`);

    return NextResponse.json({ 
      success: true, 
      added: addedCount,
      message: `Found ${addedCount} news items for "${topic}"`
    });

  } catch (error: any) {
    console.error('❌ Topic ingestion failed:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to fetch topic news' 
    }, { status: 500 });
  }
}