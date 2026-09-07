import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateNewsIntelligence } from '@/lib/nationpath-ai/news-engine/generator';

export async function POST(req: NextRequest) {
  let feedId: string | null = null;
  
  try {
    const body = await req.json();
    feedId = body.feedId;

    if (!feedId) {
      return NextResponse.json({ error: 'Feed ID is required' }, { status: 400 });
    }

    // 1. Fetch the raw feed
    const feed = await prisma.ingestedFeed.findUnique({
      where: { id: feedId },
    });

    if (!feed) {
      return NextResponse.json({ error: 'Feed not found' }, { status: 404 });
    }

    if (feed.status === 'processed') {
      return NextResponse.json({ error: 'This feed has already been processed' }, { status: 400 });
    }

    // 2. Update status to processing
    await prisma.ingestedFeed.update({
      where: { id: feedId },
      data: { status: 'processing' }
    });

    // 3. Generate AI Intelligence
    const aiResult = await generateNewsIntelligence(feed.title, feed.description);

    // 4. Map AI result to Article payload and create Draft
    const slug = feed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newArticle = await prisma.article.create({
      data: {
        title: aiResult.seoTitle || feed.title,
        slug: slug,
        content: aiResult.mainStory,
        excerpt: aiResult.brief,
        shortBrief: aiResult.brief,
        keyHighlights: [
          `Issue: ${aiResult.keyHighlights.issue}`,
          `Location: ${aiResult.keyHighlights.location}`,
          `Authority: ${aiResult.keyHighlights.authority}`,
          `Action: ${aiResult.keyHighlights.actionTaken}`,
          `Impact: ${aiResult.keyHighlights.impact}`
        ],
        whyItMatters: `${aiResult.whyItMatters.broaderImpact}\n\nAnalysis: ${aiResult.whyItMatters.objectiveAnalysis}`,
        background: aiResult.whyItMatters.broaderImpact,
        timeline: aiResult.timeline as any,
        factCheck: aiResult.factChecks as any,
        whatsNext: aiResult.whatsNext,
        keyTakeaways: aiResult.keyTakeaways,
        faqItems: aiResult.faqs as any,
        metaTitle: aiResult.seoTitle,
        metaDescription: aiResult.metaDescription,
        metaKeywords: aiResult.metaKeywords,
        tags: aiResult.metaKeywords ? aiResult.metaKeywords.split(',').map((k: string) => k.trim()) : [],
        status: 'draft',
        aiGenerated: true,
        aiVersion: 'cloudflare-llama-3.1-v1',
        ingestedFeeds: {
          connect: { id: feedId }
        }
      }
    });

    // 5. Update feed status to processed and link article
    await prisma.ingestedFeed.update({
      where: { id: feedId },
      data: { 
        status: 'processed',
        generatedArticleId: newArticle.id
      }
    });

    return NextResponse.json({ 
      success: true, 
      articleId: newArticle.id,
      message: 'Article generated successfully!' 
    });

  } catch (error: any) {
    console.error('❌ AI Generation from Feed Failed:', error);
    
    // Safely revert status to pending on failure
    if (feedId) {
      await prisma.ingestedFeed.update({
        where: { id: feedId },
        data: { status: 'pending' }
      }).catch((e) => console.error('Failed to revert feed status:', e));
    }

    return NextResponse.json({ 
      error: error.message || 'Failed to generate article from feed' 
    }, { status: 500 });
  }
}