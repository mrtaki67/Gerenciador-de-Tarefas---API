import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRouterPath } from "./utils/routeParamentersRegex.js"

const database = new Database()

export const Routers = [
    {
        method: 'POST',
        path: buildRouterPath('/tasks'),
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
        path: buildRouterPath('/tasks'),
        handle: (req, res) => {
            return res
                .end(JSON.stringify(database.select('tasks')))
        }
    },
    {
        method: 'PUT',
        path: buildRouterPath('/tasks/:id'),
        handle: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body

            try {
                database.update("tasks", id, {
                    title,
                    description,
                })

            } catch (error) {

                return res.writeHead(400).end(error.message)                
            }


            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRouterPath('/tasks/:id'),
        handle: (req, res) => {
            const { id } = req.params

            try {
                database.delete("tasks", id)

            } catch (error) {

                return res.writeHead(400).end(error.message)                
            }


            return res.writeHead(204).end()
        }
    },

]