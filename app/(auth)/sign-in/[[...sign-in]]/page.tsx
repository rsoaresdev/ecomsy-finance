import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* First Column, login form */}
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome back!</h1>
          <p className="text-base text-[#7E8CA0]">
            Log in to your account to access your financial dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          {/* When Clerk is ready */}
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>

          {/* While Clerk is loading */}
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>

      {/* Second Column, logo sidebar */}
      <div className="h-full bg-blue-100 hidden lg:flex items-center justify-center">
        <Image src={`/logo.svg`} alt="logo" height={100} width={100} />
      </div>
    </div>
  );
}
