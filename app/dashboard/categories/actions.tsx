"use client";

import { Edit, MoreHorizontal, TrashIcon } from "lucide-react";

import { useConfirm } from "@/hooks/use-confirm";

import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const deleteMutation = useDeleteCategory(id);
  const { onOpen } = useOpenCategory();

  const [ConfirmDialog, confirm] = useConfirm(
    "Tem a certeza?",
    "Ao confirmar está a apagar esta categoria permanentemente.",
  );

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };
  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => {
              onOpen(id);
            }}
          >
            <Edit className="size-4 mr-2" />
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
            className="!text-red-600"
          >
            <TrashIcon className="size-4 mr-2" />
            Apagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
