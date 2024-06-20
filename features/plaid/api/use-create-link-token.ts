import { InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";

import { toastAlert } from "@/lib/utils";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.plaid)["create-link-token"]["$post"],
  200
>;

export const useCreateLinkToken = () => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.plaid["create-link-token"].$post();

      if (!response.ok) {
        throw Error("Failed to create link token");
      }

      return await response.json();
    },
    onSuccess: () => {
      toastAlert("Link-token criado com sucesso!", "success");
    },
    onError: () => {
      toastAlert("Ocorreu um erro ao criar o link-token.", "danger");
    },
  });

  return mutation;
};
