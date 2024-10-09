import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toastAlert } from "@/lib/utils";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions["bulk-delete"].$post({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toastAlert("Transações apagadas com sucesso", "success");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toastAlert("Ocorreu um erro ao apagar transações", "danger");
    },
  });
};
