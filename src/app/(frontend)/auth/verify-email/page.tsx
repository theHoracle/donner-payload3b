import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const VerifyEmailPage = async ({ params }: PageProps) => {
  const searchParams = await params
  const token = searchParams.token
  const toEmail = searchParams.to
  
  return (
    <div className="container relative flex pt-20 flex-col items-center lg:px-0">
      <div className="w-full mx-auto flex flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-6">
            <div
              className="relative mb-4 
             size-60 text-muted-foreground"
            >
              <Image
                src="/sent-to-email-cartoon.png"
                alt="hippo sent"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold text-2xl">Check your email</h3>
            {toEmail ? (
              <p className="text-muted-foreground text-center">
                {" "}
                We&apos;ve sent a verification link to{" "}
                <span className="font-semibold">{toEmail}</span>
              </p>
            ) : (
              <p>We&apos;ve sent the verification link to your email</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;