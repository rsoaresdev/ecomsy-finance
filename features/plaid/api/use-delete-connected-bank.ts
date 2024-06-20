import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toastAlert } from "@/lib/utils";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.plaid)["connected-bank"]["$delete"],
  200
>;

export const useDeleteConnectedBank = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.plaid["connected-bank"].$delete();

      if (!response.ok) {
        throw Error("Failed to delete connected bank");
      }

      return await response.json();
    },
    onSuccess: () => {
      toastAlert("Conta bancária desconectada com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: ["connected-bank"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toastAlert("Ocorreu um erro ao desconectar a conta bancária.", "danger");

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ["connected-bank"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return mutation;
};
