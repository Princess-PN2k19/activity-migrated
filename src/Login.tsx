import './App.css';

interface IProps {
    signUp: any,
    inputUname: any,
    inputPass: any,
    login: any
}

function Login(props: IProps) {
    const { signUp, inputUname, inputPass, login } = props;
    return (
        <div className="login">
            <div className="container">
                <form onSubmit={(e) => e.preventDefault()}>
                    <h1>Sign In</h1><br /><br />
                    <label>Username*:</label><br /><br />
                    <input name="username" type="text" onChange={inputUname} placeholder="Enter your username" required></input><br /><br /><br />
                    <label>Password*:</label><br /><br />
                    <input name="password" type="password" onChange={inputPass} placeholder="Enter your password" required></input><br /><br /><br />
                    <button className="loginBtn" onClick={login}>Sign In</button><br /><br /><br />
                    <button className="toRegBtn" onClick={signUp}>Don't have an account yet? Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Login;