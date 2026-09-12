import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateNewsIntelligence } from '@/lib/nationpath-ai/news-engine/generator';

// ✅ Default modules agar frontend se na aayein
const DEFAULT_MODULES = [
  'mainStory', 'brief', 'keyTakeaways', 'keyHighlights', 'whyItMatters', 
  'whatsNext', 'background', 'expertOpinion', 'suggestedCategory', 'timeline', 
  'factChecks', 'faqs', 'seo'
];

export async function POST(req: NextRequest) {
  let feedId: string | null = null;
  
  try {
    const body = await req.json();
    feedId = body.feedId;
    
    // ✅ NEW: Action, Modules, isEditorial accept karein
    const action = body.action || 'save'; 
    const modulesToGenerate = body.modulesToGenerate || DEFAULT_MODULES;
    const isEditorial = body.isEditorial === true; // Strict boolean check

    if (!feedId) {
      return NextResponse.json({ error: 'Feed ID is required' }, { status: 400 });
    }

    // 1. Fetch the raw feed (Include source to get category safely)
    const feed = await prisma.ingestedFeed.findUnique({
      where: { id: feedId },
      include: { source: true } 
    });

    if (!feed) {
      return NextResponse.json({ error: 'Feed not found' }, { status: 404 });
    }

    if (feed.status === 'processed' && action === 'save') {
      return NextResponse.json({ error: 'This feed has already been processed' }, { status: 400 });
    }

    // ✅ ENRICHED CONTEXT: AI ko Title ke saath Source, Category aur Keywords bhi do
    const feedCategory = feed.source?.category || 'General';
    const enrichedContent = `
      Source: ${feed.source?.name || 'Unknown'}
      Category: ${feedCategory}
      Keywords: ${feed.keywords?.join(', ') || 'None'}
      Original Description: ${feed.description || feed.title}
    `.trim();

    console.log(` Starting AI generation for feed: ${feed.title} (Action: ${action}, Category: ${feedCategory})`);

    // 2. Call the Enhanced AI Generator with DYNAMIC modules, isEditorial, and category
    const aiResult = await generateNewsIntelligence(
      feed.title, 
      enrichedContent,
      modulesToGenerate,
      isEditorial,
      feedCategory 
    );

    // ✅ STEP 1: If action is 'preview', return data immediately WITHOUT saving to DB
    if (action === 'preview') {
      return NextResponse.json({ 
        success: true, 
        data: aiResult,
        message: 'Preview generated successfully' 
      });
    }

    // ✅ STEP 2: If action is 'save', proceed with Database operations
    
    // Update status to processing
    await prisma.ingestedFeed.update({
      where: { id: feedId },
      data: { status: 'processing' }
    });

    // Safe Mapping for Database
    const slug = (aiResult.urlSlug || feed.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const targetCategory = aiResult.suggestedCategory || feedCategory;

    const expertOpinionString = aiResult.expertOpinion?.length > 0
      ? aiResult.expertOpinion.map((exp: any) => `${exp.expert || 'Expert'} (${exp.designation || 'Analyst'}): "${exp.quote}"`).join('\n\n')
      : undefined;

    // ✅ PRISMA RELATION FIX: Category ko connectOrCreate se handle karo
    const newArticle = await prisma.article.create({
      data: {
        title: aiResult.seoTitle || feed.title,
        slug: slug,
        content: aiResult.mainStory || feed.description,
        excerpt: aiResult.brief || feed.description?.substring(0, 150),
        
        // Intelligence Fields (Safe mapping with fallbacks)
        shortBrief: aiResult.brief,
        keyHighlights: aiResult.keyHighlights ? [
          `Issue: ${aiResult.keyHighlights.issue || 'N/A'}`,
          `Location: ${aiResult.keyHighlights.location || 'N/A'}`,
          `Authority: ${aiResult.keyHighlights.authority || 'N/A'}`,
          `Action: ${aiResult.keyHighlights.actionTaken || 'N/A'}`,
          `Impact: ${aiResult.keyHighlights.impact || 'N/A'}`
        ] : [],
        whyItMatters: aiResult.whyItMatters ? `${aiResult.whyItMatters.broaderImpact || ''}\n\nAnalysis: ${aiResult.whyItMatters.objectiveAnalysis || ''}` : undefined,
        background: aiResult.background,
        timeline: aiResult.timeline as any,
        factCheck: aiResult.factChecks as any,
        whatsNext: aiResult.whatsNext,
        keyTakeaways: aiResult.keyTakeaways || [],
        faqItems: aiResult.faqs as any,
        expertOpinion: expertOpinionString,
        
        // SEO Fields
        metaTitle: aiResult.seoTitle,
        metaDescription: aiResult.metaDescription,
        metaKeywords: aiResult.metaKeywords,
        tags: aiResult.metaKeywords ? aiResult.metaKeywords.split(',').map((k: string) => k.trim()) : (feed.keywords || []),
        
        // Metadata & Flags
        status: 'draft',
        aiGenerated: true,
        aiVersion: 'cloudflare-llama-3.1-v1',
        
        // ✅ CATEGORY RELATION FIX: String ki jagah connectOrCreate use karo
        category: {
          connectOrCreate: {
            where: { name: targetCategory }, 
            create: { 
              name: targetCategory,
              slug: targetCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            }
          }
        },
        
        // Relations
        ingestedFeeds: {
          connect: { id: feedId }
        }
      }
    });

    // Update feed status to processed and link article
    await prisma.ingestedFeed.update({
      where: { id: feedId },
      data: { 
        status: 'processed',
        generatedArticleId: newArticle.id
      }
    });

    console.log(`✅ Successfully generated and saved article: ${newArticle.id}`);

    return NextResponse.json({ 
      success: true, 
      articleId: newArticle.id,
      message: 'Article generated and saved to draft successfully!' 
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