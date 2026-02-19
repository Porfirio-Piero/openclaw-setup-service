import { NextRequest, NextResponse } from 'next/server';
import { saveWaitlist, listWaitlists, getWaitlistBySlug } from '@/lib/blob-store';
import { generateId, generateSlug } from '@/lib/utils';
import { Waitlist, TemplateType } from '@/types';
import { templates } from '@/lib/templates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, template, userId } = body;

    if (!name || !template || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate template
    if (!templates[template as TemplateType]) {
      return NextResponse.json(
        { error: 'Invalid template' },
        { status: 400 }
      );
    }

    const templateConfig = templates[template as TemplateType];
    const slug = generateSlug(name);

    // Check for duplicate slug
    const existing = await getWaitlistBySlug(slug);
    if (existing) {
      return NextResponse.json(
        { error: 'A waitlist with this name already exists' },
        { status: 409 }
      );
    }

    const waitlist: Waitlist = {
      id: generateId(),
      name,
      slug,
      description: description || '',
      template: template as TemplateType,
      branding: templateConfig.defaultBranding,
      settings: templateConfig.defaultSettings,
      signups: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId,
      plan: 'free',
    };

    await saveWaitlist(waitlist);

    return NextResponse.json(waitlist, { status: 201 });
  } catch (error) {
    console.error('Error creating waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to create waitlist' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const waitlists = await listWaitlists(userId);
    return NextResponse.json(waitlists);
  } catch (error) {
    console.error('Error listing waitlists:', error);
    return NextResponse.json(
      { error: 'Failed to list waitlists' },
      { status: 500 }
    );
  }
}
