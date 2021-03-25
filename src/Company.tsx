import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from "axios";
import { useState } from "react";

interface ICompany {
    id: string,
    company_name: string
}

interface IProps {
    companies: ICompany[],
    companyName: string,
    inputCompName: any,
    addInputCompany: any,
    deleteCompany: any,
    idEdit: string,
    setIdEdit: any,
    getAllCompanies: any

}

function Companies(props: IProps) {
    const { companies, companyName, inputCompName, addInputCompany, deleteCompany, setIdEdit } = props;


    return (
        <Router>
            <div className="company">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input name="companyName" type="text" onChange={inputCompName} placeholder="Enter a company" required>
                    </input>
                    <button type="submit" disabled={!companyName} onClick={addInputCompany} >Add</button>
                </form>
                <br /><br />
                <table>
                    <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((item, index) => (
                            <tr key={index}>
                                <td>{item.company_name}</td>
                                <td>
                                    <Link to="/edit-company"><button className="editBtn" onClick={() => { setIdEdit(item.id) }}>Edit</button></Link>
                                    <button className="deleteBtn" onClick={() => deleteCompany(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Switch>
                    <Route path="/edit-company">
                        <Edit getAllCompanies={props.getAllCompanies} idEdit={props.idEdit} companies={props.companies} companyName={props.companyName} inputCompName={props.inputCompName} addInputCompany={props.addInputCompany} deleteCompany={props.deleteCompany} setIdEdit={props.setIdEdit} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Edit(props: IProps) {
    const { idEdit, getAllCompanies } = props;
    const [newCompanyName, setNewCompanyName] = useState("")
    const inputNewCompanyName = (e: any) => {
        setNewCompanyName(e.target.value)
    }
    const handleEdit = (id: any) => {
        if (newCompanyName === "") {
            alert("New company name field cannot be empty!");
        } else {
            axios.put('api/companies/' + id, { company_name: newCompanyName })
                .then(res => {
                    console.log("SUCCESS", res)
                    alert("Updated successfully!");
                    getAllCompanies()
                })
                .catch(err => {
                    console.log("ERROR", err)
                    alert("Error.")
                })
        }
    }
    return (
        <div className="editCompany">
            <form onSubmit={(e) => e.preventDefault()}>
                <h2>Edit Company Details</h2>
                <input onChange={inputNewCompanyName} type="text" name="newCompanyName" placeholder="New company name" />
                <button disabled={!newCompanyName} onClick={() => handleEdit(idEdit)} type="submit" className="updateBtn">Save</button>
            </form>
        </div>
    )
}

export default Companies;