"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export default function Dashboard() {
  const { onOpen } = useNewAccount();

  return (
    <div>
      <Button onClick={onOpen}>Criar uma conta</Button>
    </div>
  );
}
