import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    console.log('🧹 Running automated ingestion cleanup...');

    // 1. Delete 'processed' feeds that were fetched more than 15 minutes ago
    // (Meaning: AI has generated the article, raw data is no longer needed)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    
    const deletedProcessed = await prisma.ingestedFeed.deleteMany({
      where: {
        status: 'processed',
        fetchedAt: { lt: fifteenMinutesAgo } // ✅ Changed from updatedAt to fetchedAt
      }
    });

    // 2. Delete 'pending' feeds that are older than 24 hours
    // (Meaning: Stale data that was never processed, no longer relevant)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const deletedStale = await prisma.ingestedFeed.deleteMany({
      where: {
        status: 'pending',
        fetchedAt: { lt: twentyFourHoursAgo }
      }
    });

    const totalDeleted = deletedProcessed.count + deletedStale.count;
    
    if (totalDeleted > 0) {
      console.log(`✅ Cleanup complete: Removed ${deletedProcessed.count} processed & ${deletedStale.count} stale feeds.`);
    }

    return NextResponse.json({ 
      success: true, 
      deleted: totalDeleted 
    });

  } catch (error: any) {
    console.error('❌ Auto-Cleanup failed:', error);
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}