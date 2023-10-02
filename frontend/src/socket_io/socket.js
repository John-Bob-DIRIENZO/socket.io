import {io} from 'socket.io-client'

// Je vais chercher à me connecter au namespace /admin
const server = 'http://localhost:4000'


// Je passe autoConnect à false pour me permettre d'avoir une
// phase d'authentification
export const socket = io(server, {autoConnect: false})

// Pratique pour le debug, cet évènement est lancé
// dès qu'un message nous est destiné, même si aucun
// écouteur spécifique n'est enregistré
socket.onAny((event, ...args) => {
    console.log(event, args)
})


