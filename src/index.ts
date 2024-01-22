import express, {Request, Response} from 'express';
import { router } from './routes';
import 'reflect-metadata';
import { AppDataSource } from './database';
const cors = require('cors');


const server = express();
server.use(cors())


AppDataSource.initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((error) => {
        console.error(error)
    })

server.use(express.json())
server.use(router)

server.get('/', (request: Request, response: Response) => {
    return response.status(200).json({message: 'DominBank API'})
})

server.listen(5000, () => console.log('Server on'))