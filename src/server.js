import http from 'node:http'
import { json } from './middlewares/json.js'
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

const server = http.createServer( async (req, res) => {
    const { method, url } = req

    // tratamento de dados
    await json(req, res)

    // rotas
    if(method === 'POST' && url === '/tasks') {
        const { title, description } = req.body

        const task = ({
            id: randomUUID(),
            title,
            description,
            completed_at: null,
            createdAt: new Date(),
            updated_at: null
        })

        database.insert('tasks', task)

        return res.writeHead(201).end()
    }

    if(method === 'GET' && url === '/tasks') {
        return res
                .end(JSON.stringify(database.select('tasks')))
    }

    return res.writeHead(404).end()
})

server.listen(3333)

