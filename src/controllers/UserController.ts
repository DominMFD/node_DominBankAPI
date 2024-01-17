import { Request, Response } from "express"
import { UserService } from "../services/UserService"

export class UserController {

    userService: UserService

    constructor (
        userService = new UserService()
    ) {
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {

            
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
            
            this.userService.createUser(user.name, user.email, user.password)
            return response.status(201).json({message: 'Usuário criado'})
        }

    getUser = async (request: Request, response: Response) => {
        const { userEmail } = request.params
        const user = await this.userService.getUser(userEmail)
        return response.status(200).json( {
            userId: user?.id_user,
            name: user?.name,
            email: user?.email,
            password: user?.password,
            balance: user?.balance,
        } )
    }

    deleteUser = (request: Request, response: Response) => {

        const userId = request.params.id

        try {

            this.userService.deleteUser(userId)
            return response.status(200).json({message: 'Usuario excluido com sucesso'})

        } catch(error) {
            console.error('Erro ao deletar o usuário', error)
            return response.status(500).json({message: 'Erro interno do servidor'})
        }
        
    }

    getAllUsers = async (request: Request, response: Response) => {
        const users = await this.userService.getAllUsers()
        return response.json(users)
    }

    updateUser = async (request: Request, response: Response) => {
        const userId = request.params.id
        const dataForUpdate = request.body

        try {
            const user = await this.userService.getUserById(userId)

            if(!user) {
                return response.status(404).json({message: 'Usuário não encontrado.'})
            }

            const userExist = await this.userService.getUser(user.email)

            if(userExist === null) {
                return response.status(404).json({message: 'Email já cadastrado.'})
            }

            this.userService.updateUser(user, dataForUpdate)

            this.userService.saveUser(user)

            return response.status(200).json({message: 'Usuário atualizado com sucesso'})
        } catch (error) {
            console.error('Erro ao atualizar  o  usuário', error)
            return response.status(500).json({message: 'Erro interno do servidor'})
        }
    }

    withdrawMoney = async (request: Request, response: Response) => {
        const userId = request.params.id
        const dataForUpdate = request.body.balance

        try {
            const user = await this.userService.getUserById(userId)

            if(!user) {
                return response.status(404).json({message: 'Usuário não encontrado.'})
            }

            const userExist = await this.userService.getUser(user.email)

            if(userExist === null) {
                return response.status(404).json({message: 'Email já cadastrado.'})
            }

            this.userService.withdrawMoney(user, dataForUpdate)

            this.userService.saveUser(user)

            return response.status(200).json({message: 'Saque realizado com sucesso'})
        } catch (error) {
            console.error('Erro ao atualizar  o  usuário', error)
            return response.status(500).json({message: 'Erro interno do servidor'})
        }
    }
}