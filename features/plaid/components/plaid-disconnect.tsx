"use client";

import { useDeleteConnectedBank } from "@/features/plaid/api/use-delete-connected-bank";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";

export const PlaidDisconnect = () => {
  const [Dialog, confirm] = useConfirm(
    "Tem a certeza?",
    "Ao confirmar irá desconectar a sua conta bancária e remover todos os dados associados permanentemente.",
  );
  const deleteConnectedBank = useDeleteConnectedBank();

  const onClick = async () => {
    const ok = await confirm();

    if (ok) {
      deleteConnectedBank.mutate();
    }
  };

  return (
    <>
      <Dialog />
      <Button
        onClick={onClick}
        disabled={deleteConnectedBank.isPending}
        size="sm"
        variant="destructive"
      >
        Desconectar
      </Button>
    </>
  );
};
