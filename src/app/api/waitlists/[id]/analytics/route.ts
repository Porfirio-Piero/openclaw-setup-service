import { NextRequest, NextResponse } from 'next/server';
import { getWaitlist, getAnalytics, exportCSV } from '@/lib/blob-store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const format = searchParams.get('format');

    const waitlist = await getWaitlist(id);
    if (!waitlist) {
      return NextResponse.json(
        { error: 'Waitlist not found' },
        { status: 404 }
      );
    }

    // Only allow owner to view analytics
    if (waitlist.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Export CSV
    if (format === 'csv') {
      const csv = await exportCSV(id);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${waitlist.slug}-signups.csv"`,
        },
      });
    }

    // Return analytics
    const analytics = await getAnalytics(id);
    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error getting analytics:', error);
    return NextResponse.json(
      { error: 'Failed to get analytics' },
      { status: 500 }
    );
  }
}
