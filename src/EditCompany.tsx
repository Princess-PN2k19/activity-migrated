import axios from "axios";
import { useState } from "react";

function EditCompany() {
    const [newCompanyName, setNewCompanyName] = useState("")
    const inputNewCompanyName = (e: any) => {
        setNewCompanyName(e.target.value)
    }
    const handleEdit = (id: any) => {
        axios.put('api/companies' + id)
            .then(res => {
                alert("Updated successfully");
            })
            .catch(err => {
                alert("Error.")
            })
    }
    return (
        <div className="container">
                <form onSubmit={(e) => e.preventDefault()}>
                    <h3>Edit Company Details</h3>
                    <label>
                        Company Name:
                    </label>
                    <input onChange={inputNewCompanyName} type="text" name="companyName"/>
                    <br /><br />
                    <button onClick={handleEdit} type="submit"></button>
                </form>
        </div>
    );
}

export default EditCompany;