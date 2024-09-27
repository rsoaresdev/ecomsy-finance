import {InferRequestType, InferResponseType} from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {client} from "@/lib/hono";
import {toastAlert} from "@/lib/utils";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)[":id"]["$patch"]
>["json"];

export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions[":id"].$patch({
        param: {id},
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toastAlert("Transação atualizada com sucesso", "success");
      queryClient.invalidateQueries({queryKey: ["transaction", {id}]});
      queryClient.invalidateQueries({queryKey: ["transactions"]});
      queryClient.invalidateQueries({queryKey: ["summary"]});
    },
    onError: () => {
      toastAlert("Ocorreu um erro ao editar a transação", "danger");
    },
  });
};
