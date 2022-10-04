// Si no esta agregado la propiedad: "type": "module" en el package.json se utiliza require
// require()

// import __ from ''; modules
// "type": "module" // importar module -> import from // export default

import express from 'express'

import kodersRouter from './routers/koders.router.js'


const server = express() // creando nuestro server


// middleware - convertir lo que llega en body a un json
server.use(express.json())


// routers

// GET /koders/
server.use('/koders', kodersRouter)





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



// PATCH /koders/:id

// queries params

// https://kodemia.mx/koders?gender=m
// Filtrar
// Información extra para el Request
// requets.query.gender


// Router -> 


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


/*
Práctica:
    GET /mentors
    GET /mentors/:id
    POST /mentors
    PATCH /mentors/:id
    DELETE /mentors/:id

    Router para mentores
*/
