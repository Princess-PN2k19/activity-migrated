import './App.css';
import axios from "axios";
import Modal from "react-modal";
import React, { useState } from "react";
Modal.setAppElement("#root");


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
    idDelete: string,
    setIdDelete: any,
    getAllCompanies: any,
    inputNewCompanyName: any,
    newCompanyName: string

}

function Companies(props: IProps) {
    const { companies, companyName, inputCompName, addInputCompany, deleteCompany, setIdDelete, idDelete, setIdEdit, idEdit, getAllCompanies, inputNewCompanyName, newCompanyName } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleEdit = (id: any) => {
        if (newCompanyName === "") {
            alert("New company name field cannot be empty!");
        } else {
            axios.put('api/companies/' + id, { company_name: newCompanyName })
                .then(res => {
                    console.log("SUCCESS", res)
                    alert("Updated successfully!");
                    getAllCompanies()
                    setIdEdit('')

                })
                .catch(err => {
                    console.log("ERROR", err)
                    alert("Error.")
                })
        }
    }

    const handleCancel = () => {
        setIdEdit('')
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
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
                        item.id === idEdit ? <tr key={index}>
                            <td><input className="editCompanyInput" value={item.company_name} onChange={(e) => inputNewCompanyName(e, index)}></input></td>
                            <td><button className="updateBtn" onClick={() => handleEdit(idEdit)}>Save</button>
                                <button className="cancelBtn" onClick={() => {handleCancel()}}>Cancel</button>
                            </td></tr> : <tr key={index}>
                                <td>{item.company_name}</td>
                                <td><button className="editBtn" onClick={() => { setIdEdit(item.id) }}>Edit</button>
                                    <button className="deleteBtn" onClick={() => {toggleModal(); setIdDelete(item.id);}}>Delete</button>
                                    <Modal isOpen={isOpen} className="mymodal" overlayClassName="myoverlay">
                                        <div>Are you sure you want to remove this company?</div><br></br>
                                        <button className="deleteBtn" onClick={() => {toggleModal(); deleteCompany(item.id);}}>Yes</button>
                                        <button className="cancelBtn" onClick={toggleModal}>Cancel</button>
                                    </Modal>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Companies;