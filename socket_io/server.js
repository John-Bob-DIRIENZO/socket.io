import express from 'express'
import {createServer} from 'node:http'
import {Server} from 'socket.io'

const hostname = '127.0.0.1'
const port = 4000

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

app.get('/', async (req, res) => {
    res.sendFile(new URL('./public/index.html', import.meta.url).pathname)
})

io.use((socket, next) => {
    const username = socket.handshake.auth.username;

    if (!username || username === 'francis') {
        return next(new Error("invalid_username"));
    }

    socket.username = username;
    next();
})

io.on('connection', (socket) => {
    console.log(`New connection from ${socket.username}`)

    socket.join('room1')
    socket.join(['room2', "room3"])

    // J'envoie un message à tous les utilisateurs connectés
    // dans cette room
    socket.to('room1').emit('message', 'Un super message')

    // Quand un client se connecte
    let users = []
    for (let [id, socket] of io.of('/').sockets) {
        users.push({
            userID: id,
            username: socket.username
        })
    }
    io.emit('users', users)

    // Quand un client se déconnecte, je renvoie la liste à jour
    socket.on('disconnect', async (reason) => {
        users = []
        for (let [id, socket] of io.of('/').sockets) {
            users.push({
                userID: id,
                username: socket.username
            })
        }
        io.emit('users', users)
    })

    socket.on('private', ({content, to}) => {
        socket.to(to).emit('private', {
            content: content,
            from: socket.id
        })
    })





    socket.on('disconnecting', (e) => {
        console.log(e)
    })


})


server.listen(port, hostname, 511, () => {
    console.log(`Server running on ${hostname}:${port}`)
})



