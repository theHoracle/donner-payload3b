'use client'

import { pollPaymentStatus } from "@/app/(frontend)/(donner)/action"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface PaymentStatusProps {
    isPaid: boolean
    donationId: string
    donationEmail: string
}

const PaymentStatus = ({ isPaid: initialIsPaid, donationId, donationEmail }: PaymentStatusProps) => {
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
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Payment Status</h1>
            <p className="text-lg">Your payment is {isPaid ? 'completed' : 'pending'}</p>
            <p className="text-lg">Your Transaction id is {donationId}</p>
            <p className="text-lg">An email would be sent to {donationEmail} upon confirmation.</p>
        </div>
    )
}

export default PaymentStatus
