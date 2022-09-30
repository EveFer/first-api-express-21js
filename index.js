// Si no esta agregado la propiedad: "type": "module" en el package.json se utiliza require
// require()

// import __ from ''; modules
// "type": "module" // importar module -> import from // export default

import express from 'express'
import fs from 'fs'

const server = express() // creando nuestro server


// middleware - convertir lo que llega en body a un json
server.use(express.json())

// - / - root path
server.get('/', (request, response) => {
    // response.setHeader('Content-Type', 'application/json')
    // const message = {
    //     message: 'Hola desde GET /'
    // }
    // const jsonString = JSON.stringify(message)
    // response.write(jsonString)
    // response.end()

    // Express
    // response json
    response.json({
        message: 'Hola desde GET /   :D'
    })
})

// GET /hola
server.get('/hola', (request, response) => {
    response.write('GET /hola')
    response.end()
})

server.post('/', (request, response) => {
    response.write('POST /')
    response.end()
})

server.patch('/', (request, response) => {
    response.write('PATCH /')
    response.end()
})

// GET /koders - regresar a todos los koders
server.get('/koders', async (request, response) => {
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8')
    const json = JSON.parse(dataFile)
    const koders = json.koders

    // Si quisieramos regresa solo los nombres de los koders :D
    // const kodersName = koders.map(koder => ({name: koder.name}))

    response.json({
        success: true,
        data: {
            koders
        }
    })
})

// POST /koders - Enviar informacion de una koder para crealo

server.post('/koders', async (request, response)=> {

    // paquete http - headers | body
    // Leer la data del nuevo koder del body
    // console.log(request.headers)
    const newKoder = request.body
    console.log(newKoder)

    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8')
    const json = JSON.parse(dataFile)

    json.koders.push(newKoder)

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json, null, 2), 'utf8')

    response.json({
        success: true,
        message: 'Koder creado!'
    })
})

// GET /koders/3
// GET /koders/2
// GET /koders/1

// Recibir información adicional
// Lo puedo hacer desde la ruta - path parameters
server.get('/koders/:idKoder', async (request, response) => {
   console.log(request.params) 
//    console.log('param name: ',request.params.name ) 
   const id = parseInt(request.params.idKoder)
   const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8')
   const json = JSON.parse(dataFile)

   const koderFound = json.koders.find(koder => koder.id === id)
   if(!koderFound) {
        response.status(404)
        response.json({
            success: false, 
            message: 'Koder no encontrado'
        })
        return
   }
   response.json({
    success: true,
    data: {
        koder:koderFound 
    }
   })
})

// fetch()


// Poner a escuchar nuestro server

server.listen(8080, () => {
    console.log('Server listening on port 8080')
})

/*
Ejercicio 1:

    - GET /koders -> Response json : {message: 'Aqui estarán todos los koders'}
    - POST /koders -> Response json : {message: 'Aqui se crearán koders'}
    - PATCH /koders -> Response json : {message: 'Aqui se actualizarán koders'}
    - DELETE /koders -> Response json : {message: 'Aqui se eliminarán koders'}

    Endpoint -> punto final de información
    Conjunto de un MÉTODO Y UNA RUTA

    GET /koders
    POST /koders
    GET /koders/:id

    GET /mentors
*/

/*
Practica integradora: fs + express

    GET /koders -> Regresar un json con una lista de koders
                   la data de los koders vendrá archivo kodemia.json
    POST /koders

    path parameters
    GET /koders/2
    GET /koders/4
    GET /koders/6

    CRUD -
    GET /koders
    POST /koders
    GET /koders/:id

    Práctica:
    DELETE /koders/:id - request.params.id
    PATCH /koders/:id - request.params.id | newData: request.body

    Investigar:
    Routers en express
    query params
*/
