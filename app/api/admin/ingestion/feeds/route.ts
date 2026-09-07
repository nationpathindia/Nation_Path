import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'all'; 
    const category = searchParams.get('category');
    const topic = searchParams.get('topic');

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const andConditions: any[] = [];

    // 1. Status & 10-Minute Rule Logic
    if (status === 'pending') {
      andConditions.push({
        status: 'pending',
        fetchedAt: { gte: tenMinutesAgo }
      });
    } else if (status === 'processed') {
      andConditions.push({ status: 'processed' });
    } else {
      andConditions.push({
        OR: [
          { status: 'processed' },
          { status: 'pending', fetchedAt: { gte: tenMinutesAgo } }
        ]
      });
    }

    // 2. Category Logic
    if (category && category !== 'all') {
      andConditions.push({
        source: { category: category }
      });
    }

    // 3. Smart Topic Logic (Keyword-based matching)
    if (topic && topic !== 'all') {
      // Extract main keywords from topic (ignore small words)
      const keywords = topic
        .split(/\s+/)
        .filter(word => word.length > 3) // Ignore words < 4 chars
        .slice(0, 4); // Top 4 keywords only

      // Create OR conditions for each keyword
      const keywordFilters = keywords.map(keyword => ({
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
          { keywords: { has: keyword } }
        ]
      }));

      // Match if ANY of the keywords match
      andConditions.push({
        OR: keywordFilters
      });
    }

    // Combine all conditions
    const whereClause = andConditions.length > 1 
      ? { AND: andConditions } 
      : (andConditions[0] || {});

    const feeds = await prisma.ingestedFeed.findMany({
      where: whereClause,
      include: { 
        source: { select: { name: true, category: true } } 
      },
      orderBy: [
        { fetchedAt: 'desc' },
        { priorityScore: 'desc' }
      ],
      take: 100, 
    });

    return NextResponse.json({ 
      feeds,
      count: feeds.length,
      filters: { status, category, topic }
    });
  } catch (error) {
    console.error('Failed to fetch feeds:', error);
    return NextResponse.json({ error: 'Failed to fetch feeds' }, { status: 500 });
  }
}