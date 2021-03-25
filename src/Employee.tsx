import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from "axios";
import { useState } from "react";

interface IEmployee {
    company_name: string,
    id: string,
    employee_name: string,
    employee_position: string
}

interface IProps {
    company_Names: string[],
    company_Ids: string[],
    employees: IEmployee[],
    companyName: string,
    employeeName: string,
    position: string,
    inputCompId: any,
    inputEmpName: any,
    inputEmpPosition: any,
    addInputEmployee: any,
    options: any,
    deleteEmployee: any,
    setIdEmpEdit: any,
    idEmpEdit: string,
    getAllEmployees: any
}

function Employee(props: IProps) {
    const { company_Names, employees, companyName, employeeName, position, inputCompId, inputEmpName, inputEmpPosition, addInputEmployee, options, deleteEmployee, setIdEmpEdit } = props;
    return (
        <Router>
            <div className="employee">
                <form onSubmit={(e) => e.preventDefault()}>
                    <select onChange={inputCompId}>{company_Names.map(options)}</select>
                    <input type="text" name="employeeName" onChange={inputEmpName} placeholder="Enter an employee name" required></input>
                    <input type="text" name="position" onChange={inputEmpPosition} placeholder="Enter employee position" required></input>
                    <button disabled={!companyName || !employeeName || !position} onClick={addInputEmployee}>Add</button>
                </form>
                <br /><br />
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Employee Name</th>
                            <th>Position</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((item, index) => (
                            <tr key={index}>
                                <td>{item.company_name}</td>
                                <td>{item.employee_name}</td>
                                <td>{item.employee_position}</td>
                                <td>
                                    <Link to="/edit-employee"><button className="editBtn" onClick={() => setIdEmpEdit(item.id)}>Edit</button></Link>
                                    <button className="deleteBtn" onClick={() => deleteEmployee(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Switch>
                    <Route path="/edit-employee">
                        <EditEmployee getAllEmployees={props.getAllEmployees} company_Names={props.company_Names} company_Ids={props.company_Ids} employees={props.employees} companyName={props.companyName} employeeName={props.employeeName} position={props.position} inputCompId={props.inputCompId} inputEmpName={props.inputEmpName} inputEmpPosition={props.inputEmpPosition} addInputEmployee={props.addInputEmployee} options={props.options} deleteEmployee={props.deleteEmployee} setIdEmpEdit={props.setIdEmpEdit} idEmpEdit={props.idEmpEdit} />
                    </Route>
                </Switch>
            </div>
        </Router>

    );
}

function EditEmployee(props: IProps) {
    const { idEmpEdit, getAllEmployees, company_Names, options } = props
    const [newEmployeeCompany, setNewEmployeeCompany] = useState("")
    const [newEmployeeName, setNewEmployeeName] = useState("")
    const [newPosition, setNewPosition] = useState("")
    const inputNewEmployeeCompany = (e: any) => {
        setNewEmployeeCompany(e.target.value)
    }
    const inputNewEmployeeName = (e: any) => {
        setNewEmployeeName(e.target.value)
    }
    const inputNewPosition = (e: any) => {
        setNewPosition(e.target.value)
    }
    const handleEdit = (id: any) => {
        if (newEmployeeName === "" || newPosition === "") {
            alert("All fields required!");
        } else {
            axios.put('api/employees' + id, { company_name: newEmployeeCompany, employee_name: newEmployeeName, employee_position: newPosition })
                .then(res => {
                    console.log("SUCCESS", res)
                    alert("Updated successfully!");
                    getAllEmployees()
                })
                .catch(err => {
                    console.log("ERROR", err)
                    alert("Error.")
                })
        }
    }
    return (
        <div className="modal">
            <form onSubmit={(e) => e.preventDefault()}>
                <h3>Edit Employee Details</h3>
                <select onChange={inputNewEmployeeCompany}>{company_Names.map(options)}</select>
                <br /><br />
                <input onChange={inputNewEmployeeName} type="text" name="companyName" placeholder="New employee name" />
                <br /><br />
                <input onChange={inputNewPosition} type="text" name="companyName" placeholder="New employee position" />
                <br /><br />
                <button onClick={() => handleEdit(idEmpEdit)} type="submit" className="updateBtn">Save</button>
            </form>
        </div>
    )

}

export default Employee;