import AuthForm from "@/components/AuthForm"
import { login } from "../action";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";

const Page = () => {
    return <div className="flex h-screen w-full items-center justify-center px-4">
        
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
                    <AuthForm onSubmitHandler={login} />
            </Suspense>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account? <Link href="/auth/signup" className="underline">Register</Link>
                </p>
            </CardFooter>
        </Card>
    </div>
}

export default Page;