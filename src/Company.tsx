import './App.css';

interface ICompany {
    id: string,
    company_name: string
}

interface IProps {
    companies: ICompany[],
    companyName: string,
    inputCompName: any,
    addInputCompany: any,
    editCompany:any,
    deleteCompany: any,
    togglePop: any
}

function Companies(props: IProps) {
    const { companies, companyName, inputCompName, addInputCompany, editCompany, deleteCompany, togglePop } = props;
    return (
        <div className="company">
            <input name="companyName" type="text" onChange={inputCompName} placeholder="Enter a company" required>
            </input>
            <button disabled={!companyName} onClick={addInputCompany} >Add</button>
            <br /><br />
            <table>
                <thead>
                    <tr>
                        <th>Company Id</th>
                        <th>Company Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.company_name}</td>
                            <td><button className="editBtn" onClick={togglePop}>Edit</button><button className="deleteBtn" onClick={() => deleteCompany(item.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Companies;