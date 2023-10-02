import {useState} from "react";

export default function MessageBox({messages, setMessageToSend}) {
    const [localMessage, setLocalMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessageToSend(localMessage)
    }

    return (
        <>
            <ul>
                {messages.map(msg => <li>{msg.content}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <input className="form-control" type="text" onChange={(e) => setLocalMessage(e.target.value)}/>
            </form>
        </>
    )
}
