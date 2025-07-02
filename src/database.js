import fs from 'node:fs/promises'

export class Database {
    #database = {}

    #persist() {
        // utilizo o fs para escrever um arquivo com o meu objeto
        fs.writeFile('db.json', JSON.stringify(this.#database))
    }

    // inserindo dados a uma tabela
    insert(table, data){
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