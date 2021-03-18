import './App.css';

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
                <h1>Sign In</h1><br/><br/>
                <label>Username:</label><br/><br/>
                {/* <input name="username" type="text" onChange={regUname} placeholder="Enter your username" required></input><br/><br /><br/> */}
                <label>Password:</label><br/><br/>
                {/* <input name="password" type="password" onChange={regPass} placeholder="Enter your password" required></input><br/><br/><br/> */}
                <label>Confirm Password:</label><br/><br/>
                {/* <input name="password" type="password" onChange={regConfirmPass} placeholder="Confirm your password" required></input><br/><br/><br/> */}
                <button className="loginBtn" onClick={register}>Sign In</button><br/><br/><br/>
                <span>Already have an account? Sign In</span>
            </div>
        </div>
    );
}

export default Register;