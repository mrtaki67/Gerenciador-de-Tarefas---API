import http from 'node:http'
import { json } from './middlewares/json.js'
import { Routers } from './router.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer( async (req, res) => {
    const { method, url } = req
    
    // tratamento de dados
    await json(req, res)

    // rotas
    const router = Routers.find((router) => {
        return router.method === method && router.path.test(url)
    })


    if(router) {
        // extraimos os parametros da requisição
        const routerParams = req.url.match(router.path)
        
        const { query, ...params } = routerParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}
        
        return router.handle(req, res)
    }
    
    // not found se a rota não existir
    return res.writeHead(404).end()
})

server.listen(3333)

