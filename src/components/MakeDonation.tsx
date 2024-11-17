'use client'
import { createPaymentSession } from "@/app/(frontend)/(donner)/action"
import { Button, buttonVariants } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {z, ZodError} from 'zod'
import { User } from "@/payload-types"
import { useState } from "react"
import { toast } from "sonner"
import { Check, Loader2, Shield } from "lucide-react"
import Link from "next/link"


interface MakeDonationProps {
    causeId: string;
    user: User | null;
}

const MakeDonation = ({ causeId, user }: MakeDonationProps) => {
    const [amount, setAmount] = useState<number | undefined>(undefined)
    const [error, setError] = useState<string | null>()
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const inputValue = e.target.value.trim(); // Remove leading/trailing spaces
            if (!inputValue) {
                setAmount(0);
                setError(undefined);
                return;
            }
        
            const parsedValue = parseFloat(inputValue);
            if (isNaN(parsedValue)) {
                setError('Only valid numbers are allowed.');
            } else {
                setAmount(parsedValue);
                setError(undefined);
            }
        } catch {
            setError('Only valid numbers are allowed.')
            return
            
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()
        if(!user) throw new Error('NO USER FOUND');
        try {
          const parsedAmount = z.number().min(100).parse(amount)
          const res = await createPaymentSession({
            causeId,
            unitAmount: parsedAmount,
            user
        })
        if(!res.success) {
            toast.error(res.error)
        } else if(res.success && res.sessionUrl) {
            window.location.href = res.sessionUrl
        }
        
        } catch (error) {
            if(error instanceof ZodError) {
                const errMessage = error.errors.map((error) => error.message).join('\n')
                setError(errMessage)
                return;
            }
        } finally {
            setIsLoading(false)
        }
    }
    


    return (
    <div className="flex flex-col">
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
    <Label>Enter amount to donate:</Label>
    <Input placeholder="₦100.00" value={amount} onChange={handleInputChange}/>
    {error ?? <span className="text-xs text-red-500">{error}</span>}
    {user ? (<Button disabled={isLoading || !!error} className="flex items-center w-full" >
        Donate 
            {isLoading && <Loader2 className="h-5 w-5 ml-1 animate-spin" />} 
            </Button>) : (
                <div className="flex flex-col min-w-[50%] max-w-80 gap-2 mx-auto">
                <Link href='/auth/login' className={buttonVariants()}>Login to donate</Link>
                <Button variant='link'>
                    Make anon donation 
                </Button>
                </div>  
            )
            }
    </form>
      
        <div className="flex flex-col lg:flex-row items-center justify-between px-10 pt-4">
                <div className='flex items-center'>
                    <Check
                        aria-hidden='true'
                        className='h-5 w-5 flex-shrink-0 text-green-500'
                        />
                    <p className='ml-2 text-sm text-muted-foreground'>
                    Naira is accepted
                </p>
            </div>
            <div className='group inline-flex text-sm text-medium'>
              <Shield
                   aria-hidden='true'
                   className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                />
                <span className='text-muted-foreground hover:text-gray-700'>
                    Secure Payments
                </span>
            </div>
        </div>
    </div>)
}

export default MakeDonation;