import './App.css';
import Modal from "react-modal";
import React, { useState } from "react";

Modal.setAppElement("#root");

interface IEmployee {
    company_name: string,
    id: string,
    employee_name: string,
    employee_position: string
}

interface IPosition {
    id: string,
    role: string
}

interface IProps {
    positions: IPosition[],
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
    choices: any,
    deleteEmployee: any,
    setIdEmpEdit: any,
    idEmpEdit: string,
    inputNewEmployeeCompany: any,
    inputNewPosition: any,
    inputNewEmployeeName: any,
    handleEdit: any
}

function Employee(props: IProps) {
    const { handleEdit, inputNewEmployeeName, inputNewPosition, inputNewEmployeeCompany, positions, company_Names, employees, companyName, employeeName, position, inputCompId, inputEmpName, inputEmpPosition, addInputEmployee, options, choices, deleteEmployee, setIdEmpEdit, idEmpEdit } = props;
    const [isOpen, setIsOpen] = useState(false);

    const handleCancel = () => {
        setIdEmpEdit('')
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="employee">
            <form onSubmit={(e) => e.preventDefault()}>
                <select value={company_Names[0]} onChange={inputCompId}>{company_Names.map((i, index) => options(i, index))}</select>
                <select value={positions[0].role} onChange={inputEmpPosition}>{positions.map((i, index) => choices(i.role, index))}</select>
                <input type="text" name="employeeName" onChange={inputEmpName} placeholder="Enter an employee name" required></input>
                <button type="submit" disabled={!companyName || !employeeName || !position} onClick={addInputEmployee}>Add</button>
            </form>
            <br /><br />
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Employee Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((item, index) => (
                        item.id === idEmpEdit ? <tr key={index}>
                            <td><select className="editEmployeeCompany" value={item.company_name} onChange={inputNewEmployeeCompany}>{company_Names.map((i, index) => options(i, index))}</select></td>
                            <td><select className="editEmployeePosition" value={item.employee_position} onChange={inputNewPosition}>{positions.map((i, index) => choices(i.role, index))}</select></td>
                            <td><input onChange={inputNewEmployeeName} value={item.employee_name} type="text" className="editEmployeeName" placeholder="New employee name" /></td>
                            <td><button onClick={() => handleEdit(idEmpEdit)} type="submit" className="updateBtn">Save</button>
                                <button onClick={() => handleCancel()} type="submit" className="cancelBtn">Cancel</button>
                            </td></tr> : <tr key={index}>
                                <td>{item.company_name}</td>
                                <td>{item.employee_position}</td>
                                <td>{item.employee_name}</td>
                                <td><button className="editBtn" onClick={() => setIdEmpEdit(item.id)}>Edit</button>
                                    <button className="deleteBtn" onClick={toggleModal}>Delete</button></td>
                                    <Modal isOpen={isOpen} className="mymodal" overlayClassName="myoverlay">
                                        <div>Are you sure you want to delete this employee?</div><br></br>
                                        <button className="deleteBtn" onClick={() => {toggleModal(); deleteEmployee(item.id);}}>Yes</button>
                                        <button className="cancelBtn" onClick={toggleModal}>Cancel</button>
                                    </Modal>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}

export default Employee;