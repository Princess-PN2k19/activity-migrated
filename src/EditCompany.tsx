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
    }
    return (
        <div className="modal">
            <div className="modal_content">
                <div>
                    <form>
                        <h3>Edit Company</h3>
                        <label>
                            Company Name:
                            <input onChange={inputNewCompanyName} type="text" name="companyName" />
                        </label>
                        <br /><br />
                        <button onClick={handleEdit} type="submit"></button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCompany;