import { Request, Response } from "express"
import { UserService } from "../services/UserService"


export class LoginController {

    userService: UserService

    constructor(
        userService = new UserService()
    ) {
        this.userService = userService
    }
    login = async (request: Request, response: Response) => {

        const {email} = request.body

       try {

        const token = await this.userService.getUser(email)

        return response.status(200).json({ token })

       } catch (error) {

        return response.status(500).json({message: 'Email ou senha invalida '})

       }
    }
}