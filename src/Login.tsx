import './App.css';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from 'react';

interface IProps {
    signUp: any,
}

function Login(props: IProps) {
    const { signUp } = props;
    const [uname, setUname] = useState("")
    const [pass, setPass] = useState("")
    const handleUname = (e: any) => {
        setUname(e.target.value)
    }
    const handlePass = (e: any) => {
        setPass(e.target.value)
    }

    const history = useHistory();

    const LoginFunction = () => {
        const userAccount = {
            username: uname,
            password: pass
        };
        console.log("UNAME", uname);
        if (uname === '' || pass === '') {
            alert("All fields are required!")
        } else {
            axios.post('api/user/login', userAccount)
                .then(res => {
                    if (res.data.error === false) {
                        localStorage.setItem("username", res.data.user[0].username);
                        history.push('/')
                    } else {
                        console.log("Invalid credentials!")
                        handleUname('')
                        handlePass('')
                    }
                })
                .catch(err => {
                    alert("Invalid credentials!");
                    console.log(err, "ERROR")
                    handleUname('')
                    handlePass('')
                })
        }
    }

    return (
        <div className="login">
            <div className="container">
                <form onSubmit={(e) => e.preventDefault()}>
                    <h1>Sign In</h1><br /><br />
                    <label>Username*:</label><br /><br />
                    <input name="username" type="text" onChange={handleUname} placeholder="Enter your username" required></input><br /><br /><br />
                    <label>Password*:</label><br /><br />
                    <input name="password" type="password" onChange={handlePass} placeholder="Enter your password" required></input><br /><br /><br />
                    <button className="loginBtn" onClick={LoginFunction}>Sign In</button><br /><br /><br />
                    <button className="toRegBtn" onClick={signUp}>Don't have an account yet? Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Login;