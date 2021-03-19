import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login';

interface IProps {
    regUname: string,
    regPass: string,
    regConfirmPass: string,
    register: any
}

function Register(props: IProps) {
    const { regUname, regPass, regConfirmPass, register } = props;
    return (
        <div className="login">
            <div className="container">
                <h1>Sign Up</h1><br/><br/>
                <label>Username*:</label><br/><br/>
                {/* <input name="username" type="text" onChange={regUname} placeholder="Enter your username" required></input><br/><br /><br/> */}
                <label>Password*:</label><br/><br/>
                {/* <input name="password" type="password" onChange={regPass} placeholder="Enter your password" required></input><br/><br/><br/> */}
                <label>Confirm Password*:</label><br/><br/>
                {/* <input name="password" type="password" onChange={regConfirmPass} placeholder="Confirm your password" required></input><br/><br/><br/> */}
                <button className="loginBtn" onClick={register}>Sign In</button><br/><br/><br/>
                <Link to="/login">Already have an account? Sign In</Link>
                <Route path="/login" component={Login}/>
            </div>
        </div>
    );
}

export default Register;