"use client";


import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";
import { verifyEmail } from "@/app/(frontend)/auth/action";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {

const [isLoading, setIsLoading] = useState(true)
const [isError, setIsError] = useState(false)

useEffect(() => {
    const verify = async () => {
        const result = await verifyEmail(token)
        if(!result) {
            setIsError(true)
        }
    }
    verify().finally(() => setIsLoading(false))
}, [token])


  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-600" />
        <h3 className="font-semibold text-xl text-center">
          There was a problem
        </h3>
        <p className="text-muted-foreground text-sm">
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-300" />
        <h3 className="font-semibold text-xl text-center">
          Verifying email...
        </h3>
        <p className="text-muted-foreground text-sm">
          This shouldn&apos;t take long 😅.
        </p>
      </div>
    );
  } else if (!isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-96 text-muted-foreground">
          <Image src="/sent-to-mail.png" fill alt="The email was sent" />
        </div>
        <h3 className="font-semibold text-2xl"> You&apos;re all set</h3>
        <p className="text-muted-foreground text-center mt-1">
          Thank you for verifying your email
        </p>
        <Link className={buttonVariants({ className: "mt-4" })} href="/auth/login">
          Continue to sign in
        </Link>
      </div>
    );
  }

};
export default VerifyEmail;