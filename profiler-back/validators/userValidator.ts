import { z } from 'zod'

export const createUserPayload = z.object({
    email: z.string().email(),
    password: z.string().min(1).max(50),
})

export const getOneUserPayload = z.object({
    userUuid: z.string().uuid(),
})