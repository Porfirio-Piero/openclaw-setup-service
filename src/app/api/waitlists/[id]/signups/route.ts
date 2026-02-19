import { NextRequest, NextResponse } from 'next/server';
import { getWaitlist, addSignup, getSignupByReferralCode, verifySignup } from '@/lib/blob-store';
import { generateId, generateReferralCode, validateEmail } from '@/lib/utils';
import { Signup } from '@/types';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { email, name, referralCode } = body;

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
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

    // Check max signups limit
    if (waitlist.settings.maxSignups && waitlist.signups.length >= waitlist.settings.maxSignups) {
      return NextResponse.json(
        { error: 'Waitlist is full' },
        { status: 403 }
      );
    }

    // Validate referral code if provided
    let referredBy: string | undefined;
    if (referralCode) {
      const referrer = await getSignupByReferralCode(id, referralCode);
      if (referrer) {
        referredBy = referralCode;
      }
    }

    const signup: Signup = {
      id: generateId(),
      email: email.toLowerCase().trim(),
      name: name?.trim(),
      referralCode: generateReferralCode(),
      referredBy,
      referrals: 0,
      position: 0, // Will be set by addSignup
      verified: !waitlist.settings.requireVerification,
      createdAt: new Date().toISOString(),
    };

    await addSignup(id, signup);

    // Return signup data (without sensitive info for public display)
    return NextResponse.json({
      success: true,
      signup: {
        id: signup.id,
        position: signup.position,
        referralCode: signup.referralCode,
        message: waitlist.settings.successMessage,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error adding signup:', error);
    
    if (error.message === 'Email already registered') {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const waitlist = await getWaitlist(id);
    if (!waitlist) {
      return NextResponse.json(
        { error: 'Waitlist not found' },
        { status: 404 }
      );
    }

    // Only allow owner to view all signups
    if (waitlist.userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(waitlist.signups);
  } catch (error) {
    console.error('Error getting signups:', error);
    return NextResponse.json(
      { error: 'Failed to get signups' },
      { status: 500 }
    );
  }
}
