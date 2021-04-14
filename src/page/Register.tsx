import '../App.css';
import { Redirect } from "react-router-dom";

interface ICompany {
    id: string,
    company_name: string
}

interface IProps {
    inputRegUname: any,
    inputRegPass: any,
    inputRegConfirmPass: any,
    register: any,
    regUname: string,
    regPass: string,
    regConfirmPass: string,
    companies: ICompany[],
    companyName: string,
    options: any,
    inputCompId: any,
}


function Register(props: IProps) {
    const { inputRegUname, inputRegPass, inputRegConfirmPass, register, regUname, regPass, regConfirmPass, companies, companyName, options, inputCompId } = props;

    const auth = localStorage.getItem('username')
    if (auth) {
        return (
            < Redirect to={{ pathname: "/" }}></  Redirect>
        )
    } else {
        return (
            <div className="register">
                <div className="regContainer">
                    <h1>Register</h1><br /><br />
                    <label className="labelForm">Company*:</label>
                    <select value={companyName} onChange={inputCompId}>{companies.map((i, index) => options(i.company_name, index))}</select><br /><br />
                    <label className="labelForm">Username*:</label><br /><br />
                    <input name="username" type="text" value={regUname} onChange={inputRegUname} placeholder="Enter your username" required></input><br /><br /><br />
                    <label className="labelForm">Password*:</label><br /><br />
                    <input name="password" type="password" value={regPass} onChange={inputRegPass} placeholder="Enter your password" required></input><br /><br /><br />
                    <label className="labelForm">Confirm Password*:</label><br /><br />
                    <input name="password" type="password" value={regConfirmPass} onChange={inputRegConfirmPass} placeholder="Confirm your password" required></input><br /><br /><br />
                    <button className="regBtn" onClick={register}>Register</button><br /><br /><br />
                </div>
            </div>
        );
    }
}

export default Register;