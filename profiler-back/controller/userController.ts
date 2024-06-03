import { Request, Response } from 'express'
import { prisma } from '../prismaClient.js'
import { errorHandler } from '../handlers/errorHandler.js'
import { createUserPayload } from '../validators/userValidator.js'

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const payload = createUserPayload.parse(req.body)
            const user = await prisma.user.create({
                data: {
                    email: payload.email,
                    password: payload.password,
                },
                select: {
                    uuid: true,
                    email: true,
                },
            })
            res.status(200).json(user)
        } catch (error) {
            errorHandler(res, error)
        }
    }

    async logUser(req: Request, res: Response) {
        try {
            const payload = createUserPayload.parse(req.body)
            const user = await prisma.user.create({
                data: {
                    email: payload.email,
                    password: payload.password,
                },
                select: {
                    uuid: true,
                    email: true,
                },
            })
            res.status(200).json(user)
        } catch (error) {
            errorHandler(res, error)
        }
    }
}

export default UserController
