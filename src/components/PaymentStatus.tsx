'use client'

import { pollPaymentStatus } from "@/app/(frontend)/(donner)/action"
import { Check, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface PaymentStatusProps {
    isPaid: boolean
    donationId: string
}

const PaymentStatus = ({ isPaid: initialIsPaid, donationId }: PaymentStatusProps) => {
    const router = useRouter()
    const [isPaid, setIsPaid] = useState(initialIsPaid)

    useEffect(() => {
        const checkPaymentStatus = async () => {
            const updatedStatus = await pollPaymentStatus({ donationId })
            setIsPaid(updatedStatus.isPaid) 
        }
        checkPaymentStatus()
    if(!isPaid) router.refresh()
    }, [donationId, isPaid, router]) 

    return (
        <div className="">
       {!isPaid && <Loader2 className="animate-spin ml-auto h-5 w-5" />}
       {isPaid && ( 
        <div className="flex gap-1">
        <Check className="h-5 ml-auto w-5"/>
        <p>Completed</p>
        </div>
        )}
    </div>
    )
}

export default PaymentStatus
