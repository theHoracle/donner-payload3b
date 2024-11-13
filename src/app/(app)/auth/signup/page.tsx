import AuthForm from "@/components/AuthForm"
import { signup } from "../action";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";

const Page = () => {
    
    return <div className="flex h-screen w-full items-center justify-center px-4">
        
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Enter an email an password below to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
                    <AuthForm onSubmitHandler={signup} />
            </Suspense>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account? <Link href="/auth/login" className="underline">Login</Link>
                </p>
            </CardFooter>
        </Card>
    </div>
}

export default Page;