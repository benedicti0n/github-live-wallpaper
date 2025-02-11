import { Webhook } from "svix"
import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const userCreateAndDelete = async (req: Request, res: Response) => {
    console.log("hi");

    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env')
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers and body
    const headers = req.headers
    const payload = req.body.toString("utf8")

    // Get Svix headers for verification
    const svix_id = headers['svix-id']
    const svix_timestamp = headers['svix-timestamp']
    const svix_signature = headers['svix-signature']

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return void res.status(400).json({
            success: false,
            message: 'Error: Missing svix headers',
        })
    }

    let evt: any

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If verification fails, error out and return error code
    try {
        evt = wh.verify(payload, {
            'svix-id': svix_id as string,
            'svix-timestamp': svix_timestamp as string,
            'svix-signature': svix_signature as string,
        })
    } catch (err: any) {
        console.log('Error: Could not verify webhook:', err.message)
        return void res.status(400).json({
            success: false,
            message: err.message,
        })
    }

    // Do something with payload
    // For this guide, log payload to console
    const userId = evt.data.id
    const eventType = evt.type

    try {
        if (eventType === 'user.created') {
            // Save user to the database
            await prisma.user.create({
                data: {
                    id: userId,
                    email: evt.data.email_addresses[0].email_address,
                    platformsConnectedTo: {
                        create: {} // This will create a PlatformsConnectedTo with default values
                    }
                    // Add any other fields you need to save
                }
            })
        } else if (eventType === 'user.deleted') {
            // Delete user and related records from the database
            await prisma.user.delete({
                where: { id: userId },
            })
        }
    } catch (error) {
        console.error('Database operation failed:', error)
        return void res.status(500).json({
            success: false,
            message: 'Database operation failed',
        })
    }

    return void res.status(200).json({
        success: true,
        message: 'Webhook received',
    })
}