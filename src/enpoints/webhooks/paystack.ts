import type { Endpoint } from 'payload'
import {createHmac} from 'crypto'

const PaystackWebhook: Endpoint = {
    path: '/webhooks/paystack',
    method: 'post',
    handler: async ( req ) => {
        // @ts-expect-error req is possibly undefined
        const body = await req.json()
        const SECRET = process.env.PAYSTACK_SECRET_KEY!
        const hash = createHmac('sha512', SECRET).update(JSON.stringify(body)).digest('hex')
        
        const signature = req.headers.get('x-paystack-signature')
        if(hash == signature) {
            const event = body
            const session = event.data
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
            const causeId = donation.donationCause
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
                where: {
                    id: {
                        equals: donation.id
                    }
                },
                data: {
                    _isPaid: true
                }
            })
    
            // update cause recieved amount to display to users
            await payload.update({
                collection: 'causes', 
                where: {
                    id: {
                        equals: cause
                    }
                },
                data: {
                    raisedAmount: cause.raisedAmount + donation.amount
                }
            })   
        }
    }
    return Response.json({message: 'Updated Successfully'}, {status: 200})
    
    }

}

export default PaystackWebhook