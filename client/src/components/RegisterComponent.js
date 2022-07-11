import React, { useState } from 'react'
import { useAccount } from '../hooks'
import { useNavigate } from "react-router-dom";

const RegisterComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const { handleRegister } = useAccount()

    const navigate = useNavigate();

    const register = () => {
        navigate("/login")
      }

    const USER_VALIDATE = /\S+@\S+\.\S+/;
    const PWD_VALIDATE = /^.{6,}$/

    const handleUsername = (e) => {
        const usernameTxt = e.target.value;
        setUsername(usernameTxt);
        if (USER_VALIDATE.test(usernameTxt) === true) {
            setUsernameError(null)
        } else {
            setUsername("")
            setUsernameError("Invalid username!")
        }
    };
    const handlePassword = (e) => {
        const passwordTxt = e.target.value;
        setPassword(passwordTxt);
        if (PWD_VALIDATE.test(passwordTxt) === true) {
            setPasswordError("")
        } else {
            setPassword("")
            setPasswordError("Invalid password!")
        }
    };
    const handleSubmit = () => {
        handleRegister({ username: username, password: password })
    }

    return (
        <div>
            <div><input placeholder="username" onChange={handleUsername} /></div>
            {
                usernameError && (
                    <div style={{ marginTop: "5px", color: "red" }}>
                        {usernameError}
                    </div>
                )
            }
            <div><input placeholder="password" onChange={handlePassword} type= "password" /></div>
            {passwordError && (
                <div style={{ marginTop: "5px", color: "red" }}>
                    {passwordError}
                </div>
            )}
            <button onClick={handleSubmit}>Register</button>
            <a href="#" onClick={register}>Login</a>
        </div>
    )
}

export default RegisterComponent