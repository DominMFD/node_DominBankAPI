import { EntityManager } from "typeorm";
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

    getUser = async (user_id: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                id_user: user_id
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
}