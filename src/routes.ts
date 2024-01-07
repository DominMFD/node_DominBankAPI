import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { verifyAuth } from './midleware/verifyAuth'

export const router = Router()

const userController = new UserController()
const logiControler = new LoginController()

router.post('/user', userController.createUser)
router.get('/users',  userController.getAllUsers)
router.get('/user/:userEmail', userController.getUser)
router.put('/user/:id', userController.updateUserEmail)
router.delete("/users", userController.deleteUser)

router.post('/login', logiControler.login)
