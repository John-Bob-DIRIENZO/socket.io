import 'bootstrap/dist/css/bootstrap.min.css'
import Login from "./component/Login";
import {useEffect, useRef, useState} from "react";
import {socket} from "./socket_io/socket";
import UserList from "./component/UserList";
import MessageBox from "./component/MessageBox";

function App() {
    const isMounted = useRef(false)
    const [username, setUsername] = useState("")
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState("")
    const [messages, setMessages] = useState([])
    const [messageToSend, setMessageToSend] = useState("")

    useEffect(() => {
        if (isMounted.current) return

        socket.on("connect_error", (err) => {
            if (err.message === "invalid_username") {
                console.log(err)
                setUsername("");
            }
        });

        socket.on('users', users => {
            setUsers(users)
        })

        socket.on('private', ({content, from}) => {
            setMessages(p => ([
                ...p, {
                    content,
                    from
                }
            ]))
        })

        isMounted.current = true
    }, []);

    useEffect(() => {
        if (!username) return

        // Je peux passer un objet avec n'importe quelle
        // structure ici
        socket.auth = {username: username}
        socket.connect()
    }, [username]);

    useEffect(() => {
        if (!messageToSend || !username || !selectedUser) return

        console.log("message")
        socket.emit('private', {
            content: messageToSend,
            to: selectedUser // L'ID de l'utilisateur
        })

    }, [messageToSend])

    return (
        <div className="container mt-5 text-center">
            {!username && <Login setUsername={setUsername}/>}
            {username && <MessageBox messages={messages} setMessageToSend={setMessageToSend}/>}
            <UserList users={users} setSelectedUser={setSelectedUser}/>
        </div>
    );
}

export default App;
