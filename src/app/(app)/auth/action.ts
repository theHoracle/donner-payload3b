'use server'
import { setJWTSession } from "@/lib/session";
import payload from "@/payload";
import { z } from "zod";




const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

type FormSchema = z.infer<typeof formSchema>

export async function signup({email, password}: FormSchema) {
    if(!email || !password) {
        console.error('Email and password are required', email, password)
        return {
            success: false,
            message: 'Email and password are required'
        }
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
        const { token } = await payload.login({
            collection: 'users',
            data: {
                email,
                password
            }  
        })
        await setJWTSession(token)
    return {
        success: true,
    };
    } catch (error) {
        console.error('Incorrect Email or Password', error)
        throw new Error('Incorrect Email or Password')
    }
}