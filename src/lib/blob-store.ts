import { put, list, del } from '@vercel/blob';
import { Waitlist, Signup, User, Analytics, ClerkUser } from '@/types';

const WAITLIST_PREFIX = 'waitlists/';
const SIGNUP_PREFIX = 'signups/';
const USER_PREFIX = 'users/';

export async function saveWaitlist(waitlist: Waitlist): Promise<void> {
  const key = `${WAITLIST_PREFIX}${waitlist.id}.json`;
  await put(key, JSON.stringify(waitlist), {
    access: 'public',
    contentType: 'application/json',
  });
}

export async function getWaitlist(id: string): Promise<Waitlist | null> {
  try {
    const key = `${WAITLIST_PREFIX}${id}.json`;
    const response = await fetch(`${process.env.BLOB_BASE_URL || ''}/${key}`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function getWaitlistBySlug(slug: string): Promise<Waitlist | null> {
  try {
    const { blobs } = await list({ prefix: WAITLIST_PREFIX });
    for (const blob of blobs) {
      const response = await fetch(blob.url);
      if (response.ok) {
        const waitlist: Waitlist = await response.json();
        if (waitlist.slug === slug) {
          return waitlist;
        }
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function deleteWaitlist(id: string): Promise<void> {
  const key = `${WAITLIST_PREFIX}${id}.json`;
  await del(key);
}

export async function listWaitlists(userId: string): Promise<Waitlist[]> {
  try {
    const { blobs } = await list({ prefix: WAITLIST_PREFIX });
    const waitlists: Waitlist[] = [];
    
    for (const blob of blobs) {
      const response = await fetch(blob.url);
      if (response.ok) {
        const waitlist: Waitlist = await response.json();
        if (waitlist.userId === userId) {
          waitlists.push(waitlist);
        }
      }
    }
    
    return waitlists.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return [];
  }
}

export async function countWaitlists(userId: string): Promise<number> {
  const waitlists = await listWaitlists(userId);
  return waitlists.length;
}

export async function countTotalSignups(userId: string): Promise<number> {
  const waitlists = await listWaitlists(userId);
  return waitlists.reduce((total, waitlist) => total + waitlist.signups.length, 0);
}

export async function addSignup(waitlistId: string, signup: Signup): Promise<void> {
  const waitlist = await getWaitlist(waitlistId);
  if (!waitlist) throw new Error('Waitlist not found');
  
  // Check for duplicate email
  const existing = waitlist.signups.find(s => s.email === signup.email);
  if (existing) {
    throw new Error('Email already registered');
  }
  
  // Set position
  signup.position = waitlist.signups.length + 1;
  
  waitlist.signups.push(signup);
  waitlist.updatedAt = new Date().toISOString();
  
  // Update referral count if referred
  if (signup.referredBy) {
    const referrer = waitlist.signups.find(s => s.referralCode === signup.referredBy);
    if (referrer) {
      referrer.referrals += 1;
    }
  }
  
  await saveWaitlist(waitlist);
}

export async function verifySignup(waitlistId: string, signupId: string): Promise<void> {
  const waitlist = await getWaitlist(waitlistId);
  if (!waitlist) throw new Error('Waitlist not found');
  
  const signup = waitlist.signups.find(s => s.id === signupId);
  if (!signup) throw new Error('Signup not found');
  
  signup.verified = true;
  signup.verifiedAt = new Date().toISOString();
  waitlist.updatedAt = new Date().toISOString();
  
  await saveWaitlist(waitlist);
}

export async function getSignupByReferralCode(waitlistId: string, code: string): Promise<Signup | null> {
  const waitlist = await getWaitlist(waitlistId);
  if (!waitlist) return null;
  
  return waitlist.signups.find(s => s.referralCode === code) || null;
}

export async function getAnalytics(waitlistId: string): Promise<Analytics> {
  const waitlist = await getWaitlist(waitlistId);
  if (!waitlist) throw new Error('Waitlist not found');
  
  const signups = waitlist.signups;
  const verifiedSignups = signups.filter(s => s.verified);
  const referralSignups = signups.filter(s => s.referredBy);
  
  // Calculate daily signups
  const dailyMap = new Map<string, number>();
  signups.forEach(s => {
    const date = s.createdAt.split('T')[0];
    dailyMap.set(date, (dailyMap.get(date) || 0) + 1);
  });
  
  const dailySignups = Array.from(dailyMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30); // Last 30 days
  
  // Top referrers
  const topReferrers = signups
    .filter(s => s.referrals > 0)
    .sort((a, b) => b.referrals - a.referrals)
    .slice(0, 10)
    .map(s => ({ email: s.email, referrals: s.referrals }));
  
  return {
    totalSignups: signups.length,
    verifiedSignups: verifiedSignups.length,
    referralSignups: referralSignups.length,
    conversionRate: signups.length > 0 ? (verifiedSignups.length / signups.length) * 100 : 0,
    topReferrers,
    dailySignups,
    trafficSources: [{ source: 'Direct', count: signups.length }], // Simplified
  };
}

export async function exportCSV(waitlistId: string): Promise<string> {
  const waitlist = await getWaitlist(waitlistId);
  if (!waitlist) throw new Error('Waitlist not found');
  
  const headers = ['Email', 'Name', 'Position', 'Referrals', 'Verified', 'Referral Code', 'Referred By', 'Created At'];
  const rows = waitlist.signups.map(s => [
    s.email,
    s.name || '',
    s.position,
    s.referrals,
    s.verified ? 'Yes' : 'No',
    s.referralCode,
    s.referredBy || '',
    s.createdAt,
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

// User management functions
export async function getUser(id: string): Promise<User | null> {
  try {
    const key = `${USER_PREFIX}${id}.json`;
    const response = await fetch(`${process.env.BLOB_BASE_URL || ''}/${key}`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function saveUser(user: User): Promise<void> {
  const key = `${USER_PREFIX}${user.id}.json`;
  await put(key, JSON.stringify(user), {
    access: 'public',
    contentType: 'application/json',
  });
}

export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  try {
    // List all users and find by clerkId
    const { blobs } = await list({ prefix: USER_PREFIX });
    
    for (const blob of blobs) {
      const response = await fetch(blob.url);
      if (response.ok) {
        const user: User = await response.json();
        if (user.clerkId === clerkId) {
          return user;
        }
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting user by clerkId:', error);
    return null;
  }
}

export async function createOrUpdateUserFromClerk(
  clerkUser: ClerkUser,
  existingUser?: User
): Promise<User> {
  const now = new Date().toISOString();
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ');
  
  const user: User = existingUser || {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    clerkId: clerkUser.id,
    email: clerkUser.email,
    name: name || undefined,
    plan: 'free',
    waitlists: [],
    maxWaitlists: 1,
    maxSignupsPerWaitlist: 100,
    createdAt: now,
    updatedAt: now,
  };

  // Update fields from Clerk
  user.clerkId = clerkUser.id;
  user.email = clerkUser.email;
  if (name) user.name = name;
  user.updatedAt = now;

  // If existingUser was passed with additional fields, merge them
  if (existingUser) {
    Object.assign(user, existingUser);
  }

  await saveUser(user);
  return user;
}

export async function updateUserSubscription(
  clerkId: string,
  updates: Partial<Pick<User, 'plan' | 'stripeCustomerId' | 'stripeSubscriptionId' | 'stripePriceId' | 'stripeCurrentPeriodEnd' | 'maxWaitlists' | 'maxSignupsPerWaitlist'>>
): Promise<User | null> {
  const user = await getUserByClerkId(clerkId);
  if (!user) return null;

  Object.assign(user, updates, { updatedAt: new Date().toISOString() });
  await saveUser(user);
  return user;
}
