import { getWaitlistBySlug } from '@/lib/blob-store';
import WaitlistPublicPage from '@/components/WaitlistPublicPage';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PublicWaitlistPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const query = await searchParams;
  const referralCode = typeof query.ref === 'string' ? query.ref : undefined;

  const waitlist = await getWaitlistBySlug(slug);

  if (!waitlist) {
    notFound();
  }

  return <WaitlistPublicPage waitlist={waitlist} referralCode={referralCode} />;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const waitlist = await getWaitlistBySlug(slug);

  if (!waitlist) {
    return {
      title: 'Waitlist Not Found',
    };
  }

  return {
    title: waitlist.settings.seoTitle || waitlist.name,
    description: waitlist.settings.seoDescription || waitlist.description,
    openGraph: {
      title: waitlist.settings.seoTitle || waitlist.name,
      description: waitlist.settings.seoDescription || waitlist.description,
      images: waitlist.settings.socialImage ? [waitlist.settings.socialImage] : [],
    },
  };
}
