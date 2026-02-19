import { NextRequest, NextResponse } from 'next/server';
import { getWaitlist, saveWaitlist, deleteWaitlist } from '@/lib/blob-store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const waitlist = await getWaitlist(id);

    if (!waitlist) {
      return NextResponse.json(
        { error: 'Waitlist not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(waitlist);
  } catch (error) {
    console.error('Error getting waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to get waitlist' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const existing = await getWaitlist(id);
    if (!existing) {
      return NextResponse.json(
        { error: 'Waitlist not found' },
        { status: 404 }
      );
    }

    const updated: typeof existing = {
      ...existing,
      ...body,
      id: existing.id, // Prevent ID change
      updatedAt: new Date().toISOString(),
    };

    await saveWaitlist(updated);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to update waitlist' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteWaitlist(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to delete waitlist' },
      { status: 500 }
    );
  }
}
