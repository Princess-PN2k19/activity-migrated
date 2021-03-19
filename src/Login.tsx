import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from './Register';

interface IProps {
    inputUname: any,
    inputPass: any,
    login: any
}

function Login(props: IProps) {
    const { inputUname, inputPass, login } = props;
    return (
        <Router>
            <div className="login">
                <div className="container">
                    <h1>Sign In</h1><br /><br />
                    <label>Username*:</label><br /><br />
                    <input name="username" type="text" onChange={inputUname} placeholder="Enter your username" required></input><br /><br /><br />
                    <label>Password*:</label><br /><br />
                    <input name="password" type="password" onChange={inputPass} placeholder="Enter your password" required></input><br /><br /><br />
                    <button className="loginBtn" onClick={login}>Sign In</button><br /><br /><br />
                    <Link to="/register">Don't have an account? Sign up</Link>
                    <Route path="/register" component={Register}/>
                </div>
            </div>
        </Router>
    );
}

export default Login;