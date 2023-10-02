export default function UserList({users, setSelectedUser}) {
    return (
        <ul>
            {users.map(
                user => <li key={user.userID}
                            onClick={() => setSelectedUser(user.userID)}>
                    {user.username}
                </li>
            )}
        </ul>
    )
}

