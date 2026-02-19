import { NextRequest, NextResponse } from 'next/server';
import { getWaitlistBySlug } from '@/lib/blob-store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const waitlist = await getWaitlistBySlug(slug);

    if (!waitlist) {
      return NextResponse.json(
        { error: 'Waitlist not found' },
        { status: 404 }
      );
    }

    // Return public-safe data only
    return NextResponse.json({
      id: waitlist.id,
      name: waitlist.name,
      slug: waitlist.slug,
      description: waitlist.description,
      template: waitlist.template,
      branding: waitlist.branding,
      settings: waitlist.settings,
      totalSignups: waitlist.signups.length,
      createdAt: waitlist.createdAt,
    });
  } catch (error) {
    console.error('Error getting public waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to get waitlist' },
      { status: 500 }
    );
  }
}
