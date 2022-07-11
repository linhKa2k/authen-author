import React, { useEffect, useState } from 'react'
import { useUser } from '../hooks'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const {
        isError,
        isFetching,
        list,
        message,
        handleFetchList,
        updateUser, deleteUser, userToAdmin
    } = useUser()
    const navigate = useNavigate()
    const [data, setData] = useState({
        id: '',
        username: '',
    })
    const role = window.localStorage.getItem('role')

    useEffect(() => {
        handleFetchList()
    }, [])

    if (isFetching) {
        return (
            <p>Loading</p>
        )
    }
    if (isError) {
        return (
            <p>{message}</p>
        )
    }
    let ListItem = []
    ListItem = list && list.map((item, key) => {
        return (
            <tr key={key}>
                <th>{key + 1}</th>
                <th>{item.username}</th>
                <th>{item.roles.role}</th>
                <th>
                    <button onClick={() => {
                        if (role === 'admin') {
                            setData({ ...data, id: item._id, username: item.username })
                        } else {
                            alert('function used only by admin')
                        }
                    }}>SELECT</button>
                </th>
                <th>
                    <button onClick={() => {
                        if (role === 'admin') {
                            deleteUser({ id: item._id })
                        } else {
                            alert('function used only by admin')
                        }
                    }}>DELETE</button>
                </th>
                <th>
                    <button onClick={() => {
                        if (role === 'admin') {
                            userToAdmin({ id: item._id })
                        } else {
                            alert('function used only by admin')
                        }
                    }}>User to Admin</button>
                </th>
            </tr>
        )
    })
    const handleLogout = () => {
        window.localStorage.removeItem('auth-token')
        window.localStorage.removeItem('role')
        navigate('/login')
    }

    return (
        <>
            <div>Home</div>
            <input value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
            <button onClick={() => { updateUser(data) }}>UPDATE</button>
            <button onClick={handleLogout}>Log out </button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {ListItem}
                </tbody>
            </table>
        </>
    )
}