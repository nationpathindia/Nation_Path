import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Parser from 'rss-parser';
import { searchForContext } from '@/lib/ingestion/tavily-search';

const parser = new Parser();

// ✅ LIMIT: Max 15 items per topic search to save Tavily API credits
const MAX_TOPIC_ITEMS = 15;

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic required' }, { status: 400 });
    }

    console.log(`🔍 Auto-fetching ENRICHED news for topic: "${topic}"`);

    // Google News Search RSS for the specific topic
    const searchQuery = encodeURIComponent(topic);
    const feed = await parser.parseURL(
      `https://news.google.com/rss/search?q=${searchQuery}&hl=en-IN&gl=IN&ceid=IN:en`
    );

    let addedCount = 0;

    for (const item of feed.items) {
      // 🛑 CHECK LIMIT: Agar 15 items ho gaye, toh ruk jao
      if (addedCount >= MAX_TOPIC_ITEMS) {
        console.log(`🛑 Reached max limit of ${MAX_TOPIC_ITEMS} for topic: "${topic}".`);
        break;
      }

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
        continue; // 24 hours se purani news skip karo
      }

      // 🎯 THE MAGIC STEP: Tavily Search for Enriched Context
      console.log(`   🔍 Enriching via Tavily: "${item.title?.substring(0, 50)}..."`);
      const tavilyResult = await searchForContext(item.title || topic);

      // Combine Tavily verified context with original RSS snippet
      const enrichedDescription = tavilyResult.success
        ? `VERIFIED WEB CONTEXT:\n${tavilyResult.content}\n\nORIGINAL RSS SNIPPET:\n${item.contentSnippet || item.content || 'No description'}`
        : (item.contentSnippet || item.content || 'No description'); // Fallback

      // Priority score calculate karo
      const textToCheck = `${item.title} ${enrichedDescription}`.toLowerCase();
      const topicWords = topic.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      const matchedKeywords = topicWords.filter(word => textToCheck.includes(word));
      const score = Math.min(80 + (matchedKeywords.length * 10), 100);

      // Database mein save karo
      await prisma.ingestedFeed.create({
        data: {
          title: item.title || 'Untitled',
          description: enrichedDescription.substring(0, 4000), // Max 4000 chars for AI
          sourceUrl: link,
          imageUrl: (item as any).enclosure?.url || null,
          priorityScore: score,
          keywords: matchedKeywords.length > 0 ? matchedKeywords : topic.toLowerCase().split(/\s+/).filter(w => w.length > 3).slice(0, 5),
          status: 'pending',
          publishedAt: tavilyResult.publishedDate ? new Date(tavilyResult.publishedDate) : pubDate,
          fetchedAt: new Date(),
          source: {
            connectOrCreate: {
              // ✅ FIX: Prisma requires a @unique field in 'where'. 
              // Hum 'rssUrl' ko unique identifier ki tarah use kar rahe hain is virtual source ke liye.
              where: { rssUrl: 'https://virtual-topic-search' },
              create: { 
                name: 'Trending Topic Search', 
                category: 'Trending',
                rssUrl: 'https://virtual-topic-search' // Must match the 'where' clause
              },
            },
          },
        }
      });

      addedCount++;

      // 🛑 IMPORTANT: 1.5 second delay to save Tavily Free Credits
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    console.log(`✅ Successfully added ${addedCount} ENRICHED news items for topic: "${topic}"`);

    return NextResponse.json({ 
      success: true, 
      added: addedCount,
      message: `Found ${addedCount} enriched news items for "${topic}"`
    });

  } catch (error: any) {
    console.error('❌ Topic ingestion failed:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to fetch topic news' 
    }, { status: 500 });
  }
}