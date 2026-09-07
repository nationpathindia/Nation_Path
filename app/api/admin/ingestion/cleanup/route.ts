import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // 1 ghante (60 minutes) se purani "processed" news ko delete karo
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const deleted = await prisma.ingestedFeed.deleteMany({
      where: {
        status: 'processed',
        updatedAt: { lt: oneHourAgo }
      }
    });

    if (deleted.count > 0) {
      console.log(`🧹 Auto-Cleanup: Deleted ${deleted.count} old processed news items.`);
    }

    return NextResponse.json({ 
      success: true, 
      deleted: deleted.count 
    });

  } catch (error) {
    console.error('Auto-Cleanup failed:', error);
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}