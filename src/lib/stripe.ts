import Stripe from 'stripe';

// Lazy initialization - only create Stripe instance when needed at runtime
let stripeInstance: Stripe | null = null;

export const getStripe = (): Stripe => {
  if (!stripeInstance) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }
    stripeInstance = new Stripe(apiKey, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    });
  }
  return stripeInstance;
};

export const getStripePriceId = (): string => {
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    throw new Error('STRIPE_PRICE_ID environment variable is not set');
  }
  return priceId;
};

// Re-export for compatibility - but these will throw if env vars not set at runtime
// Use getStripe() and getStripePriceId() in API routes instead
export { stripeInstance as stripe };
export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || '';

export const getOrCreateCustomer = async ({
  email,
  name,
  clerkId,
}: {
  email: string;
  name?: string;
  clerkId: string;
}): Promise<string> => {
  const stripe = getStripe();
  
  // Search for existing customer by email
  const customers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (customers.data.length > 0) {
    const customer = customers.data[0];
    // Update with clerkId metadata if not present
    if (!customer.metadata?.clerkId) {
      await stripe.customers.update(customer.id, {
        metadata: { clerkId },
      });
    }
    return customer.id;
  }

  // Create new customer
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { clerkId },
  });

  return customer.id;
};

export const createCheckoutSession = async ({
  customerId,
  successUrl,
  cancelUrl,
  clerkId,
}: {
  customerId: string;
  successUrl: string;
  cancelUrl: string;
  clerkId?: string;
}) => {
  const stripe = getStripe();
  const priceId = getStripePriceId();
  
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    billing_address_collection: 'auto',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: 7,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      customerId,
      ...(clerkId && { clerkId }),
    },
  });

  return session;
};
