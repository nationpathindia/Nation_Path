// lib/ingestion/rss-service.ts

import { prisma } from '@/lib/prisma';
import { searchForContext } from './tavily-search';

// ✅ LIMIT INGESTION: Max 60 unique news items per run to save Tavily API credits
const MAX_ITEMS_PER_RUN = 60;

// ✅ SMART CATEGORY MAPPING: Sub-categories ko main categories mein map karo taaki filters kaam karein
const CATEGORY_MAPPING: Record<string, string> = {
  'Cricket': 'Sports',
  'Football': 'Sports',
  'Tennis': 'Sports',
  'Basketball': 'Sports',
  'Hockey': 'Sports',
  'Badminton': 'Sports',
  'Bollywood': 'Entertainment',
  'Movies': 'Entertainment',
  'Music': 'Entertainment',
  'Web Series': 'Entertainment',
  'Markets': 'Business',
  'Stocks': 'Business',
  'Economy': 'Business',
  'Science': 'Technology',
  'Space': 'Technology',
  'Gadgets': 'Technology',
};

function mapCategory(rawCategory: string): string {
  const normalized = rawCategory.trim();
  return CATEGORY_MAPPING[normalized] || normalized || 'General';
}

// ✅ EXPANDED DIVERSE NEWS SOURCES
const RSS_FEEDS = [
  // National / General
  { url: 'https://feeds.bbci.co.uk/news/world/asia/india/rss.xml', sourceName: 'BBC India', category: 'India' },
  { url: 'https://indianexpress.com/section/india/feed/', sourceName: 'Indian Express', category: 'India' },
  { url: 'https://www.thehindu.com/news/national/feeder/default.rss', sourceName: 'The Hindu National', category: 'India' },
  
  // World
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', sourceName: 'BBC World', category: 'World' },
  { url: 'https://www.aljazeera.com/xml/rss/all.xml', sourceName: 'Al Jazeera', category: 'World' },
  
  // Business
  { url: 'https://www.livemint.com/rss/feeds', sourceName: 'LiveMint', category: 'Business' },
  { url: 'https://economictimes.indiatimes.com/markets/stocks/rssfeeds/2146842.cms', sourceName: 'ET Markets', category: 'Business' },
  { url: 'https://www.business-standard.com/rss/home_page_top_stories.rss', sourceName: 'Business Standard', category: 'Business' },
  
  // Sports (Enhanced)
  { url: 'https://www.espncricinfo.com/rss/news', sourceName: 'ESPN Cricinfo', category: 'Sports' },
  { url: 'https://timesofindia.indiatimes.com/sports/rssfeeds/2146842.cms', sourceName: 'TOI Sports', category: 'Sports' },
  { url: 'https://www.thehindu.com/sport/cricket/feeder/default.rss', sourceName: 'The Hindu Cricket', category: 'Sports' },
  
  // Entertainment (Enhanced)
  { url: 'https://www.bollywoodhungama.com/rss/news.xml', sourceName: 'Bollywood Hungama', category: 'Entertainment' },
  { url: 'https://www.hindustantimes.com/feeds/entertainment/rss', sourceName: 'HT Entertainment', category: 'Entertainment' },
  
  // Technology / Science
  { url: 'https://www.thehindu.com/news/science/feeder/default.rss', sourceName: 'The Hindu Science', category: 'Technology' },
  { url: 'https://gadgets360.com/rss/feeds', sourceName: 'NDTV Gadgets', category: 'Technology' },
];

export async function fetchAndIngestRSS() {
  console.log(' Starting Tavily-Enriched RSS Ingestion...');
  let addedCount = 0;

  try {
    for (const feed of RSS_FEEDS) {
      // 🛑 CHECK LIMIT: Agar 60 items ho gaye, toh ingestion rok do
      if (addedCount >= MAX_ITEMS_PER_RUN) {
        console.log(`🛑 Reached maximum limit of ${MAX_ITEMS_PER_RUN} items. Stopping ingestion.`);
        break; 
      }

      console.log(`\n📡 Fetching RSS: ${feed.sourceName} (${feed.category})`);
      
      const rssResponse = await fetch(feed.url, { 
        headers: { 'User-Agent': 'NationPathBot/1.0' },
        signal: AbortSignal.timeout(10000)
      });
      
      if (!rssResponse.ok) {
        console.error(`❌ Failed to fetch RSS: ${feed.url}`);
        continue;
      }
      
      const rssText = await rssResponse.text();
      const items = extractRssItems(rssText);
      console.log(`   Found ${items.length} items in feed.`);

      for (const item of items) {
        if (addedCount >= MAX_ITEMS_PER_RUN) break;

        try {
          // 1. Duplicate check
          const existing = await prisma.ingestedFeed.findUnique({
            where: { sourceUrl: item.link },
          });
          if (existing) continue;

          // 2. 🎯 CATEGORY-AWARE TAVILY SEARCH
          let tavilyQuery = item.title;
          if (feed.category === 'Sports') {
            tavilyQuery += ' match report full scorecard details';
          } else if (feed.category === 'Crime' || feed.category === 'Legal') {
            tavilyQuery += ' FIR police statement official report sections';
          } else if (feed.category === 'Business') {
            tavilyQuery += ' financial results stock market reaction analyst';
          }

          console.log(`   🔍 Enriching via Tavily: "${item.title.substring(0, 50)}..."`);
          const tavilyResult = await searchForContext(tavilyQuery);

          // 3. Combine enriched context
          const enrichedDescription = tavilyResult.success
            ? `VERIFIED WEB CONTEXT:\n${tavilyResult.content}\n\nORIGINAL RSS SNIPPET:\n${item.description}`
            : item.description || item.title;

          // 4. Priority score
          const priorityScore = calculatePriorityScore(item.title, enrichedDescription);

          // 5. Save with MAPPED CATEGORY
          const mappedCategory = mapCategory(feed.category);

          await prisma.ingestedFeed.create({
            data: {
              title: item.title,
              description: enrichedDescription.substring(0, 4000), 
              sourceUrl: item.link,
              imageUrl: item.imageUrl || null,
              publishedAt: tavilyResult.publishedDate 
                ? new Date(tavilyResult.publishedDate) 
                : (item.pubDate ? new Date(item.pubDate) : new Date()),
              fetchedAt: new Date(),
              status: 'pending',
              priorityScore: priorityScore,
              keywords: extractKeywords(item.title),
              source: {
                connectOrCreate: {
                  where: { rssUrl: feed.url }, 
                  create: { 
                    name: feed.sourceName, 
                    category: mappedCategory, // ✅ Use mapped category
                    rssUrl: feed.url 
                  },
                },
              },
            },
          });
          
          addedCount++;
          await new Promise(resolve => setTimeout(resolve, 1500)); 

        } catch (itemError: any) {
          console.error(`   ⚠️ Failed to process item: ${item.title.substring(0, 40)}`, itemError.message);
        }
      }
    }

    console.log(`\n✅ Ingestion completed! Added ${addedCount} new enriched items.`);
    return { success: true, added: addedCount };

  } catch (error: any) {
    console.error('❌ Fatal error in RSS Ingestion:', error);
    throw new Error(error.message || 'Ingestion failed');
  }
}

// =====================================================
// HELPER FUNCTIONS (Unchanged - Already Perfect)
// =====================================================

function extractRssItems(xmlText: string) {
  const items: any[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemXml = match[1];
    const title = itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1] || 'No Title';
    const link = itemXml.match(/<link>([\s\S]*?)<\/link>/)?.[1] || '';
    const pubDate = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || null;
    const description = itemXml.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '';
    const imageUrl = itemXml.match(/<media:content[^>]*url="([^"]+)"/)?.[1] || 
                     itemXml.match(/<enclosure[^>]*url="([^"]+)"/)?.[1] || null;
    
    if (link) {
      items.push({ 
        title: cleanHtmlEntities(title).trim(), 
        link: cleanHtmlEntities(link).trim(), 
        pubDate, 
        description: cleanHtmlEntities(description).trim(),
        imageUrl: imageUrl ? cleanHtmlEntities(imageUrl).trim() : null
      });
    }
  }
  return items;
}

function extractKeywords(title: string): string[] {
  const stopWords = ['the', 'and', 'a', 'to', 'of', 'in', 'is', 'for', 'on', 'with', 'as', 'by', 'this', 'that', 'from', 'has', 'was'];
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .split(' ')
    .filter(word => word.length > 3 && !stopWords.includes(word))
    .slice(0, 5);
}

function calculatePriorityScore(title: string, text: string): number {
  let score = 50;
  const hotKeywords = ['breaking', 'exclusive', 'urgent', 'election', 'budget', 'supreme court', 'isro', 'cricket', 'scam', 'probe', 'pm modi', 'parliament'];
  const lowerText = (title + ' ' + text).toLowerCase();
  hotKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) score += 10;
  });
  return Math.min(score, 100);
}

function cleanHtmlEntities(text: string): string {
  return text
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, '');
}