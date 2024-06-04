import { Router } from 'express'
import UserController from '../controller/userController.js'

const userController = new UserController()
const userRouter: Router = Router()

userRouter.post('/', userController.createUser)
userRouter.post('/login', userController.logUser)

export { userRouter }
