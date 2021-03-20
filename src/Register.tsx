import './App.css';

interface IProps {
    signIn: any,
    inputRegUname: any,
    inputRegPass: any,
    inputRegConfirmPass: any,
    register: any
}

function Register(props: IProps) {
    const { signIn, inputRegUname, inputRegPass, inputRegConfirmPass, register } = props;
    return (
        <div className="register">
            <div className="container">
                <h1>Sign Up</h1><br/><br/>
                <label>Username*:</label><br/><br/>
                <input name="username" type="text" onChange={inputRegUname} placeholder="Enter your username" required></input><br/><br /><br/>
                <label>Password*:</label><br/><br/>
                <input name="password" type="password" onChange={inputRegPass} placeholder="Enter your password" required></input><br/><br/><br/>
                <label>Confirm Password*:</label><br/><br/>
                <input name="password" type="password" onChange={inputRegConfirmPass} placeholder="Confirm your password" required></input><br/><br/><br/>
                <button className="regBtn" onClick={register}>Sign Up</button><br/><br/><br/>
                <button className="toLoginBtn" onClick={signIn}>Already have an account? Sign In</button>
            </div>
        </div>
    );
}

export default Register;