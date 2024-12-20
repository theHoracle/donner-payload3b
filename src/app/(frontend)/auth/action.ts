'use server'
import { setJWTSession } from "@/lib/session";
import getPayload from "@/payload";
import { cookies } from "next/headers";
import { z, ZodError } from "zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

type FormSchema = z.infer<typeof formSchema>

export async function signup({email, password}: FormSchema) {
    try {
        formSchema.parse({email, password})
    } catch (error) {
        if(error instanceof ZodError) {
            return {
                success: false, message: error.message
            }
        }
    }    
    if(!email || !password) {
        console.error('Email and password are required', email, password)
        return {
            success: false,
            message: 'Email and password are required'
        }
    } 
    const payload = await getPayload()
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
        return {
            success: false,
            message: 'User already exists'
        }
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
            success: true,
            email
    };
}

export async function verifyEmail(token: string) {
    if(!token) {
        return {
            success: false,
            message: 'Token is required'
        }
    }
    const payload = await getPayload()
    const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
    })
    if(!isVerified) {
        return {
            success: false,
            message: 'Token is invalid'
        }
    }

    return {
        success: true
    }
}

export async function login({email, password}: FormSchema) {
    if(!email || !password) {
        console.error('Email and password are required', email, password)
        throw new Error('Email and password are required');
    }
    try {
        const payload = await getPayload()
        const { token } = await payload.login({
            collection: 'users',
            data: {
                email,
                password
            }  
        })
        if(token) {
            await setJWTSession(token)
            return {
                success: true,
            };
        }
        return {success: false}
    } catch (error) {
        console.error('Incorrect Email or Password', error)
        throw new Error('Incorrect Email or Password')
    }
}


export async function signOut() {
    // clear session 
    const c = await cookies();
    c.getAll().forEach((cookie) => c.delete(cookie.name));
  }