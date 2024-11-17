import type { Endpoint } from 'payload'
import { PaystackWebhookEvent } from './paystack-types';
// import {createHmac} from 'crypto'

enum PaystackIPs {
    '52.31.139.75',
    '52.49.173.169',
    '52.214.14.220',
}

const PaystackWebhook: Endpoint = {
    path: '/webhooks/paystack',
    method: 'post',
    handler: async ( req ) => {
      try {
        // @ts-expect-error tye
        const body = await req.text()
        // const SECRET = process.env.PAYSTACK_SECRET_KEY!
        // const hash = createHmac('sha512', SECRET).update(JSON.stringify(body.toString())).digest('hex');
        // const signature = req.headers.get('x-paystack-signature');
        const ip = req.headers.get('x-forwarded-for')
        // if (!signature || hash !== signature) {
        if (!ip || !Object.values(PaystackIPs).includes(ip)) {
            return Response.json(
                { error: 'Forbidden IP address, hehehe' },
                { status: 401 }
            );
        }
        const event = body as unknown as PaystackWebhookEvent
        const session = event?.data
        if(!session.metadata.userId || !session.metadata.donationId) {
            return Response.json({
                error: 'Webhook Error: No information present in Metadata'
            }, {status: 400})
        }
        if(event.event == 'charge.success') {
            const { payload } = req
            const {docs: users} = await payload.find({
                collection: 'users',
                where: {
                    id: {
                        equals: session.metadata.userId
                    }
                }
            })
            const [user] = users
            if (!user) {
                return Response.json({
                    error: 'Webhook Error: No such user'
                }, {status: 400})
              }
    
            const {docs: donations} = await payload.find({
                collection: 'donations',
                where: {
                    id: {
                        equals: session.metadata.donationId
                    }
                }
            })
            const [donation] = donations
            if(!donation) {
                return Response.json({
                    error: 'Webhook Error: No such donation'
                }, {status: 400})
            }
            
            // Get cause id
            const causeId = typeof donation.donationCause === 'string' ? 
                                donation.donationCause : 
                                donation.donationCause.id
            // find the cause to get the current raisedAmount
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
                return Response.json({
                    error: 'Webhook Error: No such cause'
                }, {status: 400})
            } 
    
            // Update donation info to verify payment on server
            await payload.update({
                collection: 'donations',
                id: donation.id,
                data: {
                    _isPaid: true
                }
            })
    
            // update cause recieved amount to display to users
            await payload.update({
                collection: 'causes', 
                id: causeId,
                data: {
                    raisedAmount: cause.raisedAmount + donation.amount
                }
            })   
            return Response.json({message: 'Updated Successfully'}, {status: 200})
        }
        return Response.json({message: 'No relevant event found'}, {status: 400})
    } catch (error) {
        return Response.json(
            { error: 'Internal Server Error: ' + error  },
            { status: 401 }
        );
    }
    
    }

}

export default PaystackWebhook