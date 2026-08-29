import Pricing from '@/components/ui/Pricing/Pricing';
import { createClient } from '@/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';

export default async function PricingPage() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  return (
    <>
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:pt-24 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Ship your product, not your billing.
          </h1>
        </div>
      </section>
      <Pricing
        user={user}
        products={products ?? []}
        subscription={subscription}
      />
    </>
  );
}
