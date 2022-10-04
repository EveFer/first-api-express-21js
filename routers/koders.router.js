import express from 'express'
import fs from 'fs'

const router = express.Router() // creando un router


// GET /koders - regresar a todos los koders
// filtrar por generacion
// filtrar por genero
// filtro de count = 2
router.get('/', async (request, response) => {
    const dataFile = await fs.promises.readFile('./kodemia.json', 'utf8')
    const json = JSON.parse(dataFile)
    let koders = json.koders
    // accedo a los query params directamente en el request
    const queries = request.query
    console.log('queries: ',queries)
    const {generation, gender} = request.query
    console.log('generation: ', generation)
    let kodersFiltered = json.koders
    // validar si viene el query
    // string -> true
    // undefined -> false
    if(generation) {
        kodersFiltered = kodersFiltered.filter(koder => koder.generation === parseInt(generation))
        // response
    }

    if(gender){
        kodersFiltered = kodersFiltered.filter(koder => koder.gender === gender)
    }

    response.json({
        success: true,
        data: {
            koders: kodersFiltered || json.koders
        }
    })
})

// POST /koders - Enviar informacion de una koder para crealo
router.post('/', async (request, reponse) => {
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
router.get('/:idKoder',async (request, response) => {
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

// DELETE /koders/:id
// path parameters
router.delete('/:idKoder', async (request, response) => {
    /*
    Analisen
        0. De donde lo quiero eliminar? Archivo - leer el archivo . fs.promise.readFile()
        1. Que koder quiero eliminar?
        2. Cual es el id del koder a eliminar? request.params
        3. Buscar al koder en la lista y Eliminar al koder - .filter() .splice()
        4. Actualizar al archivo sin el koder - fs.promise.writeFile()
        5. Responder
    */

    const dataFile = await fs.promises.readFile('kodemia.json', 'utf8')
    const json = JSON.parse(dataFile)
    // Destructuring assigment
    const { idKoder } = request.params
    const newKoders = json.koders.filter(koder => koder.id !== parseInt(idKoder))
    json.koders = newKoders // reemplazar con los nuevos koders

    await fs.promises.writeFile('kodemia.json', JSON.stringify(json, null, 2), 'utf8')
    response.json({
        success: true,
        message: 'Koder eliminado!'
    })
})

export default router