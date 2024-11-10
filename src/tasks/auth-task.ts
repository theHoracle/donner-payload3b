import { PayloadRequest, TaskConfig } from "payload";

export const createUser: TaskConfig<'createUser'> = {
    slug: 'createUser',
    retries: 2,
    inputSchema: [
        {
            name: 'email',
            type: 'text',
            required: true,
        },
        {
            name: 'password',
            type: 'text',
            required: true,
        }
    ],
    outputSchema: [
        {
            name: 'success',
            type: 'checkbox',
        },
        {
            name: 'sendToEmail',
            type: 'text',
            required: true,
        }
    ],
    handler: async ({
        input,
        req,
    }: {
        input: { email: string, password: string };
        req: PayloadRequest;
    }) => {
    
        const { payload } = req;
        const { email, password } = input;
    
        if(!email || !password) {
            throw new Error('Email and password are required');
        } 
        // check if user exists
        const {docs: users} = await payload.find({
            collection: 'users',
            where: {
                email: {
                    equals: email
                }
            }
        });
        // if user exists, throw error
        if (users.length !== 0) {
            throw new Error('User already exists');
        }
    
        await payload.create({
            collection: 'users',
            data: {
                email,
                password,
                role: 'user',
            }
        });
    
        return {
            output: {
                success: true,
                sendToEmail: email
            }
        };
    },    
}

export const verifyEmail: TaskConfig<'verifyEmail'> = {
    slug: 'verifyEmail',
    retries: 2,
    inputSchema: [
        {
            name: 'email',
            type: 'text',
            required: true,
        }
    ],
    handler: async ({
        input,
        req,
    }: {
        input: { email: string };
        req: PayloadRequest;
    }) => {
        const { payload } = req;
        const { email } = input;

        if(!email) {
            throw new Error('Email is required');
        }
        const isVerified = await payload.verifyEmail({
            collection: 'users',
            token: 'token',
        })
        if(!isVerified) {
            throw new Error('Email is not verified');
        }

        return {
            output: {
                success: true
            }
        }
    },
}


export const login: TaskConfig<'login'> = {
    slug: 'login',
    retries: 2,
    inputSchema: [
        {
            name: 'email',
            type: 'text',
            required: true,
        },
        {
            name: 'password',
            type: 'text',
            required: true,
        }
    ],
    handler: async ({ input, job, req }) => {
        const { payload, context } = req
        const { email, password } = input
        
        try {
            await payload.login({
                collection: 'users',
                data: {
                    email,
                    password
                },
                req
            })
            return {
                output: {
                    success: true
                }
            }
        } catch (error) {
            throw new Error('UNAUTHORIZED')
        }
    }
}