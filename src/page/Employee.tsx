import '../App.css';
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

interface ICompany {
    id: string,
    company_name: string
  }

interface IProps {
    editEmployee: IEditEmployee,
    positions: IPosition[],
    employees: IEmployee[],
    companies: ICompany[],
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
    const { handleEdit, inputNewEmployeeName, inputNewPosition, inputNewEmployeeCompany, positions, employees, companyName, employeeName, position, inputCompId, inputEmpName, inputEmpPosition, addInputEmployee, options, deleteEmployee, setIdEmpEdit, idEmpEdit, editEmployee, companies} = props;
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

    const companyNameById = (id: string) => {
        const item = companies.find((item) => item.id === id && item)
        return item?.company_name
    }



    return (
        <div className="employee">
            <label className="labelEmployee">Company*:</label><label className="labelEmployee">Position*:</label><label className="labelEmployee">Employee Name*:</label><br/><br/>
            <select value={companyName} onChange={inputCompId}>{companies.map((i, index) => options(i.company_name, index))}</select>           
            { positions.length && <select value={position} onChange={inputEmpPosition}>{positions.map((i, index) =>  options(i.role, index) )}</select>}    
            <input type="text" value={employeeName} name="employeeName" onChange={inputEmpName} placeholder="Enter an employee name" required></input>
            <button type="submit" onClick={addInputEmployee}>Add</button>
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
                            <td>
                                <select className="editEmployeeCompany" value={companyNameById(editEmployee.company_name)} onChange={(e) => inputNewEmployeeCompany(e)}>
                                    <option>-</option>
                                {
                                    companies.map((i, index) => options(i.company_name, index))
                                }</select>
                            </td>
                            <td><select className="editEmployeePosition" value={editEmployee.employee_position} onChange={(e) => inputNewPosition(e)}>
                                {
                                    positions.map((i, index) => options(i.role, index))
                                }
                                </select>
                            </td>
                            <td>
                                <input onChange={(e) => inputNewEmployeeName(e)} value={editEmployee.employee_name} type="text" className="editEmployeeName" placeholder="New employee name" />
                            </td>
                            <td><button onClick={() => handleEdit(idEmpEdit, editEmployee.company_name)} type="submit" className="updateBtn">Save</button>
                                <button onClick={() => handleCancel()} type="submit" className="cancelBtn">Cancel</button>
                            </td></tr> : <tr key={index}>
                                <td>{companies.find(company => company.id === item.company_name)?.company_name}</td>
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