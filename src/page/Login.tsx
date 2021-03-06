import '../App.css';
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { useState } from 'react';

interface IProps {
    setCurrentUser: any
}

function Login(props: IProps) {
    const { setCurrentUser } = props;
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
        if (uname === '' || pass === '') {
            alert("All fields are required!")
        } else {
            axios.post('api/user/login', userAccount)
                .then(res => {
                    if (res.data.error === false) {
                        setCurrentUser(userAccount.username)
                        localStorage.setItem("username", res.data.user[0].username);
                        history.push('/')
                    } else {
                        console.log("Invalid credentials!")
                        setUname('')
                        setPass('')
                    }
                })
                .catch(err => {
                    console.log(err, "ERROR")
                    alert("Invalid credentials!");
                    setUname('')
                    setPass('')
                })
        }
    }

    const auth = localStorage.getItem('username')

    if (auth) {
        return (
            < Redirect to={{ pathname: "/" }}></  Redirect>
        )
    } else {
        return (
            <div className="login">
                <div className="container">
                    <h1>Login</h1><br /><br />
                    <label className="labelForm">Username*:</label><br /><br />
                    <input name="username" type="text" value={uname} onChange={handleUname} placeholder="Enter your username" required></input><br /><br /><br />
                    <label className="labelForm">Password*:</label><br /><br />
                    <input name="password" type="password" value={pass} onChange={handlePass} placeholder="Enter your password" required></input><br /><br /><br />
                    <button className="loginBtn" onClick={LoginFunction}>Login</button><br /><br /><br />
                </div>
            </div>
        );
    }
}

export default Login;