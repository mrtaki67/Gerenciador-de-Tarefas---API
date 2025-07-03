import fs from 'node:fs/promises'

// caminho relativo para o arquivo
const databasepath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    #persist() {
        // utilizo o fs para escrever um arquivo com o meu objeto
        fs.writeFile(databasepath, JSON.stringify(this.#database))
    }

    // construtor para ler o arquivo assim que iniciar
    constructor() {
        fs.readFile(databasepath, 'utf8')
            .then((data) => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    // inserindo dados a uma tabela
    insert(table, data){
        // verifico se a tabela ja existe ou não
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)

        } else {
            this.#database[table] = [data]

        }

        this.#persist()

        return data
    }

    // buscando os dados de uma tabela
    select(table, search) {
        let data = this.#database[table] ?? []

        if(search) {
            // filtro os dados de acordo com as query passadas
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })

        }

        return data
    }

    update(table, id, data) {
        // validar se o registro existe
        let taskIndex = this.#database[table].findIndex(row => row.id === id)

        // caso exista, atualizamos
        if(taskIndex > -1 ) {
            // buscamos a task
            const task = this.#database[table].find(row => row.id === id)

            // atualizamos somente as informações fornecidas
            this.#database[table][taskIndex] = {
                id,
                title: data.title ?? task.title, 
                description: data.description ?? task.description,
                completed_at: null,
                createdAt: task.createdAt,
                updated_at: new Date()
            }

            this.#persist()
            
        } else {
            throw new Error("Task not found or not exist")
            
        } 

    }

    delete(table, id) {
        // validar se o registro existe
        const task = this.#database[table].findIndex(row => row.id === id)
        
        // caso exista, deletamos
        if(task > -1 ) {
            this.#database[table].splice(task, 1)
            this.#persist()
            
        } else {
            throw new Error("Task not found or not exist")
            
        } 

    }



}