import { InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";

import { toastAlert } from "@/lib/utils";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.subscriptions.checkout)["$post"],
  200
>;

export const useCheckoutSubscription = () => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subscriptions.checkout.$post();

      if (!response.ok) {
        throw Error("Failed to create create URL");
      }

      return await response.json();
    },
    onSuccess: ({ data }: { data: string }) => {
      window.location.href = data;
    },
    onError: () => {
      toastAlert("Ocorreu um erro ao obter os dados da subscrição.", "danger");
    },
  });

  return mutation;
};
