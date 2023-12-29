import { Request, Response } from "express"
import { UserService } from "../services/UserService"

export class UserController {
    createUser = (request: Request, response: Response) => {

            const userService = new UserService()
            const user = request.body

            if(!user.name) {
                return response.status(400).json({message: 'Bad request: nome obrigatório'})
            }
            if (!user.email) {
                return response.status(400).json({message: 'Bad request: email obrigatório'})
            }

            if(!user.password) {
                return response.status(400).json({message: 'Bad request: senha obrigatório'})
            }
            userService.createUser(user.name, user.email, user.password)
            return response.status(201).json({message: 'Usuário criado'})
        }

    getUser = (request: Request, response: Response) => {
        const userService = new UserService()

        const users = userService.getUser()
        return response.status(200).json (users)
    }

    deleteUser = (request: Request, response: Response) => {

        
    }
}