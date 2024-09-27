import {InferRequestType, InferResponseType} from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {client} from "@/lib/hono";
import {toastAlert} from "@/lib/utils";

type ResponseType = InferResponseType<
  (typeof client.api.categories)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteCategories = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories["bulk-delete"].$post({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toastAlert("Categorias apagadas com sucesso", "success");
      queryClient.invalidateQueries({queryKey: ["categories"]});
      queryClient.invalidateQueries({queryKey: ["summary"]});
    },
    onError: () => {
      toastAlert("Ocorreu um erro ao apagar categorias", "danger");
    },
  });
};
