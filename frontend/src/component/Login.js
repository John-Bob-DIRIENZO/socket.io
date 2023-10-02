import {useState} from "react";

export default function Login({setUsername}) {
    const [localUsername, setLocalUsername] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setUsername(localUsername)
    }

    return (
        <form onSubmit={handleSubmit} className="w-50 m-auto">
            <h2 className='mb-3'>Enter a username</h2>
            <input className="form-control"
                   type="text"
                   onChange={(e) => setLocalUsername(e.target.value)}/>
        </form>
    )
}


