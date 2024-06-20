import { Button } from "@/components/ui/button";

import { useCheckoutSubscription } from "@/features/subscriptions/api/use-checkout-subscription";
import { useGetSubscription } from "@/features/subscriptions/api/use-get-subscription";

export const SubscriptionCheckout = () => {
  const checkout = useCheckoutSubscription();
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();

  return (
    <Button
      onClick={() => checkout.mutate()}
      disabled={checkout.isPending || isLoadingSubscription}
      variant="ghost"
      size="sm"
    >
      {subscription ? "Gerir" : "Subscrever"}
    </Button>
  );
};
