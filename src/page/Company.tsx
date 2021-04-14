import '../App.css';
import axios from "axios";
import Modal from "react-modal";
import React, { useState } from "react";
Modal.setAppElement("#root");

interface ICompany {
    id: string,
    company_name: string
}

interface IEditCompany {
    id: string,
    company_name: string
}

interface IProps {
    companies: ICompany[],
    editCompany: IEditCompany,
    companyAdd: string,
    inputCompName: any,
    addInputCompany: any,
    deleteCompany: any,
    idEdit: string,
    setIdEdit: any,
    getAllCompany: any,
    inputNewCompanyName: any,
    newCompanyName: string,
    userRole: any
}

function Companies(props: IProps) {
    const { companies, editCompany, companyAdd, inputCompName, addInputCompany, deleteCompany, setIdEdit, idEdit, getAllCompany, inputNewCompanyName, userRole } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [idDelete, setIdDelete] = useState('');
    const handleEdit = (id: any) => {
        if (editCompany.company_name === "") {
            alert("New company name field cannot be empty!");
        } else {
            axios.put('api/companies/' + id, { company_name: editCompany.company_name })
                .then(res => {
                    getAllCompany()
                    console.log("SUCCESS", res)
                    alert("Updated successfully!");
                    setIdEdit('', '')

                })
                .catch(err => {
                    alert("Company already exist!");
                    getAllCompany()
                    setIdEdit('', '')
                })
        }
    }

    const handleDelete = (id: string) => {
        setIdDelete(id)
    }

    const handleCancel = () => {
        setIdEdit(' ', ' ')
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    if (userRole === 'Super Admin') {
        return (
            <div className="company">
                <h1 className="header">Companies</h1>
                <label className="labelCompany">Company*:</label><br /><br />
                <input name="companyName" value={companyAdd} type="text" onChange={inputCompName} placeholder="Enter a company" required>
                </input>
                <button type="submit" onClick={addInputCompany} >Add</button>
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
                            item.id === idEdit ? <tr key={index}>
                                <td><input className="editCompanyInput" value={editCompany.company_name} onChange={(e) => inputNewCompanyName(e, index)}></input></td>
                                <td><button className="updateBtn" onClick={() => handleEdit(idEdit)}>Save</button>
                                    <button className="cancelBtn" onClick={() => { handleCancel() }}>Cancel</button>
                                </td></tr> : <tr key={index}>
                                    <td>{item.company_name}</td>
                                    <td><button className="editBtn" onClick={() => setIdEdit(item.id, item.company_name)}>Edit</button>
                                        <button className="deleteBtn" onClick={() => { toggleModal(); handleDelete(item.id); }}>Delete</button>
                                        <Modal isOpen={isOpen} className="mymodal" overlayClassName="myoverlay">
                                            <div>Are you sure you want to remove this company?</div><br></br>
                                            <button className="deleteBtn" onClick={() => { toggleModal(); deleteCompany(idDelete); }}>Yes</button>
                                            <button className="cancelBtn" onClick={toggleModal}>Cancel</button>
                                        </Modal>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default Companies;