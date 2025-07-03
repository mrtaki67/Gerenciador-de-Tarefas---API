import fs from 'node:fs'
import { parse } from 'csv'

console.log("Iniciando upload CSV..")

// faço a leitura do csv usando o fs e logo em seguida utilizo o Parse para transformar em uma matriz
const uploadStream =  fs.createReadStream('./upload/tasks.csv', 'utf8')
    .pipe(parse({
        delimiter: ';',
        columns: ["title", "description"],
        skip_empty_lines: true,
        from_line: 2
    }))

// utilizo um loop para enviar cada linha para a rota POST - /tasks    
for await(const chunk of uploadStream) {
    fetch('http://localhost:3333/tasks', {
        method: 'POST',
        body: JSON.stringify(chunk),
    }).then((response) => {
        return console.log(`Task: ${chunk.title} - ${response.statusText}`)
    }).catch((error) => {
        return console.log(error)
    })
}

console.log("Upload finalizado")
    

