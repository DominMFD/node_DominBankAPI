import { sign } from "jsonwebtoken";
import { AppDataSource } from "../database";
import { User } from "../entities/Users";
import { UserRepository } from "../repositories/UserRepository"


export class UserService {
    private userRepository: UserRepository;

    constructor (
        userRepository = new UserRepository(AppDataSource.manager),
    ){
        this.userRepository = userRepository;
    }

    createUser = async (name: string, email: string, password: string): Promise<User | null> => {
        const user = new User(name, email, password)
        return this.userRepository.createUser(user)
    }

    getUser = async (userEmail: string): Promise<User | null> => {
        return this.userRepository.getUser(userEmail)
    }

    getAuhenticatedUser = async (email: string, password: string): Promise<User | null> => {
        return this.userRepository.getUserbyEmailAndPassword(email, password)
    }

    getToken = async (email: string, password: string): Promise<string> => {
        const user = await this.getAuhenticatedUser(email, password)

        if(!user) {
            throw new Error('Email ou senha invalida!')
        }

        const tokenData = {
            name: user?.name,
            email: user?.email
        }

        const tokenKey = '123456789'

        const tokenOptions = {
            subject: user?.id_user
        }

        const token = sign(tokenData, tokenKey, tokenOptions)

        return token
    }

    deleteUser = (email: string) => {

    }

    getAllUsers = async (): Promise<User[] | null> => {
        const users = await this.userRepository.getAllUsers()
        return users
    }
}