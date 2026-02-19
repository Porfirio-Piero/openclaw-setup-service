import { NextRequest, NextResponse } from 'next/server';
import { getWaitlist, verifySignup } from '@/lib/blob-store';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { signupId, token } = body;

    if (!signupId) {
      return NextResponse.json(
        { error: 'signupId is required' },
        { status: 400 }
      );
    }

    const waitlist = await getWaitlist(id);
    if (!waitlist) {
      return NextResponse.json(
        { error: 'Waitlist not found' },
        { status: 404 }
      );
    }

    await verifySignup(id, signupId);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully!',
    });
  } catch (error) {
    console.error('Error verifying signup:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}
