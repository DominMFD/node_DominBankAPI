const db = [
    {
        name: "Joana",
        email: "Joaninha@dio.com"
    }
]


export class UserService {
    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }
        db.push(user)
        console.log('DB atualizado', db)
    }

    getAllUsers = () => {
        return db
    }

    deleteUser = (email: string) => {
        const index = db.findIndex(user => user.email === email)

        if (index !== -1) {
            db.splice(index, 1)
            return true
        }

        return false
    }
}