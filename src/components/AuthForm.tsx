"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from 'zod'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

interface AuthFormProps {
    onSubmitHandler: (values: z.infer<typeof formSchema>) => Promise<{
      success: boolean,
      email?: string,
      message?: string
    }>
}

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

const AuthForm = ({ onSubmitHandler }: AuthFormProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: ""
        },
      })
      const router = useRouter()
      const originUrl = useSearchParams().get('from')
      // submit
      async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const {success, email, message} = await onSubmitHandler(values)
            if(!success) {
                toast.error(message)
            }
            if(success && email) {
                form.reset()
                router.push(`/verify-email?to=${email}`)
            } else if(success && !email) {
              // to origin or to home
              router.push(originUrl ||'/')
            }
        } catch (error: any) {
            
        } finally {
            setIsLoading(false)
        }
        
      }
      return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="donner@mail.com" type="email" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="secret" type="password" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>  
      )

}

export default AuthForm;