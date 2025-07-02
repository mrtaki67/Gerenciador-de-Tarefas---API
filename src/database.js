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
    select(table) {
        const data = this.#database[table] ?? []

        return data
    }



}