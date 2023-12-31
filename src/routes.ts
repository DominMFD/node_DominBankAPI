import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'

export const router = Router()

const userController = new UserController()
const logiControler = new LoginController()

router.post('/user', userController.createUser)
router.get('/user/:userId', userController.getUser)
router.delete("/user", userController.deleteUser)

router.post('/login', logiControler.login)
