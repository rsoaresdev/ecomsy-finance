import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteAccounts = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts["bulk-delete"].$post({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Contas bancárias apagadas com sucesso");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      // TODO: Also invalidate summary
    },
    onError: () => {
      toast.success("Ocorreu um erro ao apagar contas bancárias");
    },
  });

  return mutation;
};
