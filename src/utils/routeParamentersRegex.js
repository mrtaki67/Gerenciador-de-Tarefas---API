// /tasks/:id

export function buildRouterPath(path) {
    // extraimos tudo que vem depois de " : " utilizando REGEX
    const routerParametersRegex = /:([(a-zA-z)]+)/g
    // pegamos a path fornecida, e substituimos pelo parametro passado na req
    const pathWithParams = path.replaceAll(routerParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    
    const pathRegex = new RegExp(`^${pathWithParams}`)

    // console.log(Array.from(path.matchAll(routerParametersRegex))) // depuração

    return pathRegex
}