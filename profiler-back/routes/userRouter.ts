import { Router } from 'express'
import UserController from '../controller/userController.js'

const userController = new UserController()
const userRouter: Router = Router()

userRouter.post('/', userController.createUser)

// handled by clerk
// userRouter.post("/login", checkBodyEmail(), checkBodyPwd(), loginAttempt);

export { userRouter }
