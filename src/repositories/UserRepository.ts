import { EntityManager} from "typeorm";
import { User } from "../entities/Users";

export class UserRepository {
    private manager: EntityManager

    constructor(
        manager: EntityManager
        
        ) {
            this.manager = manager;
    }

    createUser = async (user: User): Promise<User | null> => {
        return this.manager.save(user)
    }

    getUser = async (userEmail: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                email: userEmail
            }
        })
    }

    getUserbyEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                email,
                password
            }
        })
    }

    getAllUsers = async (): Promise<User[] | null> => {
        const users = await this.manager.find(User)
        return users

    }
}