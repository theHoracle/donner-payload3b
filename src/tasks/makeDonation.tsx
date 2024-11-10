import { paystack } from "@/lib/paystack";
import { PayloadRequest, TaskConfig, TaskHandler } from "payload";

export const createPaymentSession: TaskConfig<'createPaymentSession'> = {
  slug: 'createPaymentSession',
  retries: 2,
  inputSchema: [
    {
      name: 'causeId',
      type: 'text',
      required: true
    },
    {
      name: 'unitAmountDonated',
      type: 'number',
      required: true,
      min: 0
    }
  ],
  outputSchema: [
    {
      name: 'url',
      type: 'text'
    }
  ],
  handler: async ({ input, req }) => {
        const { causeId, unitAmountDonated } = input
        if (!causeId || !unitAmountDonated) {
            throw new Error('Caused ID and Donation amount is required');
        }
        const { payload } = req;

        const amountDonated = unitAmountDonated * 100;
        const { docs: causes } = await payload.find({
            collection: 'causes',
            where: {
                id: {
                    equals: causeId
                }
            }
        })
        const [cause] = causes
        if(!cause) {
            throw new Error('Cause not found');
        }
        const { user } = req
        const userId = req.user?.id
        if(!userId || !user) {
            throw new Error('User not found');
        }

        const donation = await payload.create({
            collection: 'donations',
            data: {
                _isPaid: false,
                user: userId,
                amount: amountDonated,
                donationCause: cause.id
            }
        })

        try {
            const paystackSession = await paystack.transaction.initialize({
                amount: amountDonated,
                currency: 'NGN',
                email: user.email,
                name: user?.email,
                reference: typeof donation.id === 'string' ? donation.id : donation.id,
                callback_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?donationId=${donation.id}`,
                metadata: {
                    userId: user?.id,
                    donationId: donation.id
                }
            })
            return {
                output: {
                url: paystackSession.data.authorization_url
            }}
        } catch (error) {
            console.log(error)
            return {
                output: {
                url: undefined
            }}
        }
    }
    }

export const checkDonationStatus: TaskConfig<'checkDonationStatus'> = {

    slug: 'checkDonationStatus',
    retries: 2,
    inputSchema: [
        {
            name: 'donationId',
            type: 'text',
            required: true
        }
    ],
    outputSchema: [
        {
            name: 'isPaid',
            type: 'checkbox'
        }
    ],
    handler: async ({ input: { donationId }, req: { payload } }) => {
        const { docs: donations } = await payload.find({
            collection: 'donations',
            where: {
                id: {
                    equals: donationId
                }
            }
        })
        if(donations.length === 0) {
            throw new Error('NOT_FOUND')
        }
        const [donation] = donations
        return {
            output: {
                isPaid: donation._isPaid
            }
        }
    }
}