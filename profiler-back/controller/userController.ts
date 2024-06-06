import { Request, Response } from 'express'
import { prisma } from '../prismaClient.js'
import { errorHandler, BaseError } from '../handlers/errorHandler.js'
import { createUserPayload, getOneUserPayload } from '../validators/userValidator.js'
import Bcrypt from '../utils/bcrypt.js'

const bcrypt = new Bcrypt()
class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const payload = createUserPayload.parse(req.body)
            const user = await prisma.user.create({
                data: {
                    email: payload.email,
                    password: bcrypt.hashString(payload.password),
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
            const user = await prisma.user.findUnique({
                where: { email: payload.email },
            })
            if (!user) {
                throw new BaseError(
                    'User not found',
                    404,
                    'User does not exists'
                )
            }
            if (!bcrypt.compareString(payload.password, user.password)) {
                throw new BaseError('Invalid password', 401)
            }
            const { password, ...others } = user
            res.status(200).json(others)
        } catch (error) {
            errorHandler(res, error)
        }
    }

    async getOneUser(req: Request, res: Response) {
        try {
            const { userUuid } = getOneUserPayload.parse(req.params)
            const user = await prisma.user.findUnique({
                where: { uuid: userUuid },
                select: {
                    email: true,
                    uuid: true
                }
            })
            if(!user){
                throw new BaseError('User not found', 404)
            }
            res.status(200).json(user)
        } catch (error) {
            errorHandler(res, error)
        }
    }

}

export default UserController
