'use server'

import { paystack } from "@/lib/paystack";
import getPayload from "@/payload";
import { User } from "@/payload-types";

type CreatePaymentSessionResponse = { success: true; sessionUrl: string } | { success: false; error: string }
type CreatePaymentSessionParams = {
    unitAmount: number,
    causeId: string,
    user: User
}

export const createPaymentSession = async ({causeId, unitAmount, user}: CreatePaymentSessionParams): Promise<CreatePaymentSessionResponse> => {
    if(unitAmount < 100) {
        return {
            success: false,
            error: 'Amount must be greater than 100'
        }
    }
    if(!causeId) {
        return {
            success: false,
            error: 'Cause ID is required'
        }
    }
    const payload = await getPayload()
    const {docs: causes} = await payload.find({
        collection: 'causes',
        where: {
            id: {
                equals: causeId
            }
        }
    })
    const [cause] = causes

    if(!cause) {
        return {
            success: false,
            error: 'Cause not found'
        }
    }

    const donation = await payload.create({
        collection: 'donations',
        data: {
            _isPaid: false,
            donationCause: cause.id,
            user: user.id,
            amount: unitAmount
        }
    })
    try {
        const amountDonated = unitAmount * 100
        const paystackSession = await paystack.transaction.initialize({
            amount: amountDonated,
            currency: 'NGN',
            email: user.email,
            name: user.email,
            reference: donation.id,
            callback_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?donationId=${donation.id}`,
            metadata: {
                userId: user.id,
                donationId: donation.id
            }
        })
        console.log(paystackSession)
        return {
            success: true,
            sessionUrl: paystackSession.data?.authorization_url
        }
    } catch (error) {
        return {
            success: false,
            error: 'Something went wrong: ' + (error instanceof Error ? error.message : '') 
        }
    }

}

export const pollPaymentStatus = async({donationId}: {donationId: string}): Promise<{isPaid: boolean}> => {
    const payload = await getPayload()
    const donation = await payload.findByID({
        collection: 'donations',
        id: donationId
    })
    // const {status} = await paystack.transaction.verify(donationId)
    if(!donation) {
        return {
            isPaid: false
        }
    }
    if(donation._isPaid ) {
        return {
            isPaid: true
        }
    }
    return {
        isPaid: false
    }
}