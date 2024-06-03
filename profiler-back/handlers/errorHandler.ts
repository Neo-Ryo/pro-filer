import { Prisma } from '@prisma/client'
import { Response } from 'express'
import { ZodError } from 'zod'

export class BaseError extends Error {
    statusCode: number
    constructor(name: string, statusCode: number, description?: string) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.statusCode = statusCode
        Error.captureStackTrace(this)
    }
}

export const errorHandler = (res: Response, error: unknown) => {
    if (error instanceof BaseError) {
        res.status(error.statusCode).json({
            error: { name: error.name, message: error.message },
        })
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({
            error: { name: error.code, message: 'unique contraint error' },
        })
    } else if (error instanceof ZodError) {
        res.status(400).json({
            error: { name: error.name, message: error.errors },
        })
    } else {
        res.status(500).json('Internal server error')
    }
}
