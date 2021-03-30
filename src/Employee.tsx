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

interface IEditEmployee {
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
    editEmployee: IEditEmployee,
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
    deleteEmployee: any,
    setIdEmpEdit: any,
    idEmpEdit: string,
    inputNewEmployeeCompany: any,
    inputNewPosition: any,
    inputNewEmployeeName: any,
    handleEdit: any,
}

function Employee(props: IProps) {
    const { handleEdit, inputNewEmployeeName, inputNewPosition, inputNewEmployeeCompany, positions, company_Names, employees, companyName, employeeName, position, inputCompId, inputEmpName, inputEmpPosition, addInputEmployee, options, deleteEmployee, setIdEmpEdit, idEmpEdit, editEmployee} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [idDelete, setIdDelete] = useState('');
    const handleCancel = () => {
        setIdEmpEdit('', '', '', '')
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const handleDelete = (id: string) => {
        setIdDelete(id)
    }


    return (
        <div className="employee">
            <select value={companyName} onChange={inputCompId}>{company_Names.map((i, index) => options(i, index))}</select>
            { positions.length && <select value={position} onChange={inputEmpPosition}>{positions.map((i, index) =>  options(i.role, index) )}</select>}
            <input type="text" value={employeeName} name="employeeName" onChange={inputEmpName} placeholder="Enter an employee name" required></input>
            <button type="submit" disabled={!companyName || !employeeName || !position} onClick={addInputEmployee}>Add</button>
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
                            <td><select className="editEmployeeCompany" value={editEmployee.company_name} onChange={(e) => inputNewEmployeeCompany(e)}>{company_Names.map((i, index) => options(i, index))}</select></td>
                            <td><select className="editEmployeePosition" value={editEmployee.employee_position} onChange={(e) => inputNewPosition(e)}>{positions.map((i, index) => options(i.role, index))}</select></td>
                            <td><input onChange={(e) => inputNewEmployeeName(e)} value={editEmployee.employee_name} type="text" className="editEmployeeName" placeholder="New employee name" /></td>
                            <td><button onClick={() => handleEdit(idEmpEdit)} type="submit" className="updateBtn">Save</button>
                                <button onClick={() => handleCancel()} type="submit" className="cancelBtn">Cancel</button>
                            </td></tr> : <tr key={index}>
                                <td>{item.company_name}</td>
                                <td>{item.employee_position}</td>
                                <td>{item.employee_name}</td>
                                <td><button className="editBtn" onClick={() => setIdEmpEdit(item.id, item.company_name, item.employee_name, item.employee_position)}>Edit</button>
                                    <button className="deleteBtn" onClick={() => { toggleModal(); handleDelete(item.id) }}>Delete</button></td>
                                <Modal isOpen={isOpen} className="mymodal" overlayClassName="myoverlay">
                                    <div>Are you sure you want to remove this employee?</div><br></br>
                                    <button className="deleteBtn" onClick={() => { toggleModal(); deleteEmployee(idDelete); }}>Yes</button>
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