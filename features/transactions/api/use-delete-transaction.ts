import {InferResponseType} from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {client} from "@/lib/hono";
import {toastAlert} from "@/lib/utils";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$delete"]
>;

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.transactions[":id"].$delete({
        param: {id},
      });
      return await response.json();
    },
    onSuccess: () => {
      toastAlert("Transação apagada com sucesso", "success");
      queryClient.invalidateQueries({queryKey: ["transaction", {id}]});
      queryClient.invalidateQueries({queryKey: ["transactions"]});
      queryClient.invalidateQueries({queryKey: ["summary"]});
    },
    onError: () => {
      toastAlert("Ocorreu um erro ao apagar a transação", "danger");
    },
  });
};
