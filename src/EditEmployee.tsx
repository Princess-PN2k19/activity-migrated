import axios from "axios";
import { useState } from "react";

function EditEmployee() {
    const [newEmployeeName, setNewEmployeeName] = useState("")
    const [newPosition, setNewPosition] = useState("")
    const inputNewEmployeeName = (e: any) => {
        setNewEmployeeName(e.target.value)
    }
    const inputNewPosition = (e: any) => {
        setNewPosition(e.target.value)
    }
    const handleEdit = (id: any) => {
        axios.put('api/employees' + id)
            .then(res => {
                alert("Updated successfully");
            })
    }
    return (
        <div className="modal">
            <form onSubmit={(e) => e.preventDefault()}>
                <h3>Edit Employee Details</h3>
                <select></select>
                <br /><br />
                <label>
                    Employee Name:
                            <input onChange={inputNewEmployeeName} type="text" name="companyName" />
                </label>
                <br /><br />
                <label>
                    Position:
                            <input onChange={inputNewPosition} type="text" name="companyName" />
                </label>
                <br /><br />
                <button onClick={handleEdit} type="submit"></button>
            </form>
        </div>
    )

}

export default EditEmployee;