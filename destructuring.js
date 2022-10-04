
const person = {
    name: 'Fernanda',
    lastName: 'Palacios',
    github: '@EveFer',
    address: {
        number: 4,
        colonia: 'Retiro San Martin'
    }
}

// const name = person.name
// const lastName = person.lastName
// const github = person.github

// destructuring
// Que propiedades quiero = de que objeto las voy obtener?
const { name: firstName, github, address: { number } } = person



const template = `Hola soy ${firstName} y mi github es: ${github}`

console.log(template)

console.log(`number: ${number}`)