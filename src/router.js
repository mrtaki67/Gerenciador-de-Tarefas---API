import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'

const database = new Database()

export const Routers = [
    {
        method: 'POST',
        url: '/tasks',
        handle: (req, res) => {
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
    },
    {
        method: 'GET',
        url: '/tasks',
        handle: (req, res) => {
            return res
                .end(JSON.stringify(database.select('tasks')))
        }
    },

]