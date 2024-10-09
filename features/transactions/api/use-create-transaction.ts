import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toastAlert } from "@/lib/utils";

type ResponseType = InferResponseType<typeof client.api.transactions.$post>;
type RequestType = InferRequestType<
  typeof client.api.transactions.$post
>["json"];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toastAlert("Transação criada com sucesso", "success");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toastAlert("Ocorreu um erro ao criar a transação", "danger");
    },
  });
};
