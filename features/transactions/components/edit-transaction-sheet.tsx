import { z } from "zod";
import { insertTransactionsSchema } from "@/db/schema";
import { convertAmountFromMiliunits } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import { useConfirm } from "@/hooks/use-confirm";

import { TransactionForm } from "@/features/transactions/components/transaction-form";

import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";
import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";

import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertTransactionsSchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();

  const [ConfirmDialog, confirm] = useConfirm(
    "Tem a certeza?",
    "Ao confirmar está a apagar esta transação permanentemente.",
  );

  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });
  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;
  const isLoading =
    transactionQuery.isLoading ||
    categoryQuery.isLoading ||
    accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };
  const defaultValues = transactionQuery.data
    ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: convertAmountFromMiliunits(
          transactionQuery.data.amount,
        ).toString(),
        date: transactionQuery.data.date
          ? new Date(transactionQuery.data.date)
          : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "0",
        date: new Date(),
        payee: "",
        notes: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Editar transação</SheetTitle>
            <SheetDescription>Edite os detalhes da transação.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
