import './App.css';

interface IEmployee {
    employee_id: string,
    id: string,
    employee_name: string,
    employee_position: string
}

interface IProps {
    company_Ids: string[],
    employees: IEmployee[],
    companyId: string,
    employeeName: string,
    position: string,
    inputCompId: any,
    inputEmpName: any,
    inputEmpPosition: any,
    addInputEmployee: any,
    options: any,
    editEmployee: any,
    deleteEmployee: any
}

function Employee(props: IProps) {
    const { company_Ids, employees, companyId, employeeName, position, inputCompId, inputEmpName, inputEmpPosition, addInputEmployee, options, editEmployee, deleteEmployee } = props;
    return (
        <div className="employee">
            <select onChange={inputCompId} value={company_Ids[0]}>{company_Ids.map(options)}</select>
            <input type="text" name="employeeName" onChange={inputEmpName} placeholder="Enter an employee name" required></input>
            <input type="text" name="position" onChange={inputEmpPosition} placeholder="Enter employee position" required></input>
            <button disabled={!companyId || !employeeName || !position} onClick={addInputEmployee}>Add</button>
            <br /><br />
            <table>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Company Id</th>
                        <th>Employee Name</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((item, index) => (
                        <tr key={index}>
                            <td>{item.employee_id}</td>
                            <td>{item.id}</td>
                            <td>{item.employee_name}</td>
                            <td>{item.employee_position}</td>
                            <td><button className="editBtn" onClick={editEmployee}>Edit</button><button className="deleteBtn" onClick={() => deleteEmployee(item.employee_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Employee;