import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)["bulk-create"]["$post"]
>["json"];

export const useBulkCreateTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions["bulk-create"].$post({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transações criadas com sucesso");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // TODO: Also invalidate summary
    },
    onError: () => {
      toast.success("Ocorreu um erro ao criar transações");
    },
  });

  return mutation;
};
