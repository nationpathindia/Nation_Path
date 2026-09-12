// lib/ingestion/tavily-search.ts

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score: number;
  published_date?: string;
}

export async function searchForContext(query: string) {
  if (!TAVILY_API_KEY) {
    console.warn('⚠️ TAVILY_API_KEY missing in .env');
    return { success: false, content: '', sources: [] };
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query,
        search_depth: 'basic', // 'basic' is faster and uses fewer credits. Use 'advanced' only if needed.
        include_answer: false, 
        max_results: 2, // Sirf top 2 results (Credit bachane ke liye)
        include_raw_content: false,
      }),
    });

    if (!response.ok) {
      console.error(' Tavily API Error:', await response.text());
      return { success: false, content: '', sources: [] };
    }

    const data = await response.json();
    const results: TavilyResult[] = data.results || [];

    if (results.length === 0) {
      return { success: false, content: '', sources: [] };
    }

    // Top 2 results ko combine karke ek rich context banayein
    const enrichedContent = results.map((r, i) => 
      `[Source ${i+1}: ${r.title}]\n${r.content}`
    ).join('\n\n---\n\n');

    const latestDate = results
      .map(r => r.published_date)
      .filter(Boolean)
      .sort()
      .pop();

    return {
      success: true,
      content: enrichedContent,
      sources: results.map(r => r.url),
      publishedDate: latestDate,
    };

  } catch (error: any) {
    console.error('❌ Tavily Search Failed:', error.message);
    return { success: false, content: '', sources: [] };
  }
}