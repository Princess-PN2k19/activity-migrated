import './App.css';
import * as react from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Company from './Company';
import Employee from './Employee';
import PrivateRoute from './PrivateRoute';
import image from './images/404.jpg';

interface ICompany {
  id: string,
  company_name: string
}

interface IEditCompany {
  id: string,
  company_name: string
}

interface IPosition {
  id: string,
  role: string
}

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

interface IState {
  editCompany: IEditCompany,
  editEmployee: IEditEmployee,
  login: boolean,
  regUname: string,
  regPass: string,
  regConfirmPass: string,
  uname: string,
  pass: string,
  companyName: string,
  newCompanyName: string,
  newEmployeeCompany: string,
  newEmployeeName: string,
  newPosition: string,
  companyId: string,
  employeeName: string,
  position: string,
  id: string,
  employee_id: string,
  positions: IPosition[],
  companies: ICompany[],
  employees: IEmployee[],
  company_Ids: string[],
  company_Names: string[],
  usernames: string[],
  users: any[],
  apiResponse: string,
  idEdit: string,
  idEmpEdit: string,
  idEmpDelete: string
}

class App extends react.Component<any, IState> {
  state: IState = {
    editCompany: {
      id: '',
      company_name: ''
    },
    editEmployee: {
      company_name: '',
      id: '',
      employee_name: '',
      employee_position: ''
    },
    login: true,
    regUname: '',
    regPass: '',
    regConfirmPass: '',
    uname: '',
    pass: '',
    companyName: '',
    newCompanyName: '',
    newEmployeeCompany: '',
    newEmployeeName: '',
    newPosition: '',
    companyId: '',
    employeeName: '',
    position: '',
    id: '',
    employee_id: '',
    positions: [],
    companies: [],
    employees: [],
    company_Ids: [],
    company_Names: [],
    usernames: [],
    users: [],
    apiResponse: '',
    idEdit: '',
    idEmpEdit: '',
    idEmpDelete: ''
  };

  componentDidMount() {
    this.getAllCompanies()
    this.getAllEmployees()
    this.getAllUsernames()
    this.getAllPositions()
  }

  getAllCompanies = async () => {
    try {
      const data = await axios.get('api/companies')
      this.setState({ companies: data.data })
      this.getAllCompanyNames()
    } catch (error) {
      console.log(error)
    }
  }

  logout = () => {
    this.setState({ login: true })
    localStorage.removeItem("username");
  }

  getAllCompanyNames = () => {
    let names: string[] = []
    this.state.companies.forEach(item => {
      names.push(item.company_name)
    })
    this.setState({ company_Names: names })
  }

  options = (i: number, index: number) => {
    return <option key={`${index}-test`}>{i}</option>
  }

  inputCompName = (e: any) => {
    const { value } = e.target;
    this.setState({ companyName: value });
  }

  inputRegUname = (e: any) => {
    const { value } = e.target;
    this.setState({ regUname: value })
  }

  inputRegPass = (e: any) => {
    const { value } = e.target;
    this.setState({ regPass: value })
  }

  inputRegConfirmPass = (e: any) => {
    const { value } = e.target;
    this.setState({ regConfirmPass: value })
  }

  inputCompId = (e: any) => {
    const { value } = e.target;
    this.setState({ companyName: value });
  }

  inputEmpName = (e: any) => {
    const { value } = e.target;
    this.setState({ employeeName: value });
  }

  inputEmpPosition = (e: any) => {
    const { value } = e.target;
    this.setState({ position: value });
  }

  inputNewCompanyName = (e: any) => {
    const { value } = e.target;
    this.setState({ editCompany: { ...this.state.editCompany, company_name: value } });
  }

  inputNewEmployeeCompany = (e: any) => {
    const { value } = e.target;
    this.setState({ editEmployee: { ...this.state.editEmployee, company_name: value } });
  }

  inputNewPosition = (e: any) => {
    const { value } = e.target;
    this.setState({ editEmployee: { ...this.state.editEmployee, employee_position: value } });
  }
  inputNewEmployeeName = (e: any, index: number) => {
    const { value } = e.target;
    this.setState({ editEmployee: { ...this.state.editEmployee, employee_name: value } });

  }

  handleEdit = (id: any) => {
    if (this.state.editEmployee.company_name === "" || this.state.editEmployee.employee_name === "" || this.state.editEmployee.employee_position === "") {
      alert("All fields are required!");
    } else {
      axios.put('api/employees/' + id, { company_name: this.state.editEmployee.company_name, employee_name: this.state.editEmployee.employee_name, employee_position: this.state.editEmployee.employee_position })
        .then(res => {
          console.log("SUCCESS", res)
          alert("Updated successfully!");
          this.getAllEmployees()
          this.setIdEmpEdit('', '', '', '')
        })
        .catch(err => {
          console.log("ERROR", err)
          alert("Error.")
        })
    }
  }

  register = () => {
    const { regUname, regPass, regConfirmPass } = this.state;
    const newAccount = {
      username: regUname,
      password: regPass
    }
    if (regUname === '' || regPass === '' || regConfirmPass === '') {
      alert("All fields are required!")
    } else {
      if (this.state.usernames.includes(regUname)) {
        alert("Username already exist!")
        this.setState({ regUname: '', regPass: '', regConfirmPass: '' })

      } else {
        if (regPass !== regConfirmPass) {
          alert("Passwords did not match!")
          this.setState({ regPass: '', regConfirmPass: '' })
        } else {
          axios.post('api/user/register', newAccount)
            .then(res => {
              alert("Sucessfully registered.");
              localStorage.setItem("username", regUname);
              this.setState({ regUname: '', regPass: '', regConfirmPass: '' })
            })
            .catch(err => {
              console.log("acc", newAccount)
              alert("Registration failed.");
              this.setState({ regUname: '', regPass: '', regConfirmPass: '' })
            })
        }
      }
    }
  }

  getAllPositions = async () => {
    try {
      const data = await axios.get('api/positions')
      this.setState({ positions: data.data })
    } catch (error) {
      console.log(error)
    }
  }

  getAllEmployees = async () => {
    try {
      const data = await axios.get('api/employees')
      this.setState({ employees: data.data })
    } catch (error) {
      console.log(error)
    }
  }

  getAllUsernames = async () => {
    try {
      const data = await axios.get('api/users')
      this.setState({ users: data.data })
      let unames: string[] = []
      this.state.users.forEach(item => {
        unames.push(item.username)
      })
      this.setState({ usernames: unames })
    } catch (error) {
      console.log(error)
    }
  }

  addInputCompany = () => {
    const company_names = this.state.companies.map((item) => item.company_name)
    if (company_names.includes(this.state.companyName)) {
      alert("Company already exist!");
      this.setState({ companyName: '' })
    } else {
      if (!this.state.companyName) {
        alert("Input field cannot be empty!");
      } else {
        axios.post('api/company', { company_name: this.state.companyName, status: "Active" })
          .then(res => {
            console.log(res, "Company added successfully!")
            this.getAllCompanies()
            this.getAllCompanyNames()
            this.setState({ companyName: '' })
          })
          .catch(err => {
            console.log(err, "Failed.")
            this.setState({ companyName: '' })
          })
      }
    }
  }

  addInputEmployee = () => {
    if (this.state.companyName === '' || this.state.employeeName === '' || this.state.position === '') {
      alert("All fields are required!")
    } else {
      axios.post('api/employee', { company_name: this.state.companyName, employee_name: this.state.employeeName, employee_position: this.state.position, status: "Active" })
        .then(res => {
          console.log("Employee added successfully!", res)
          this.getAllEmployees()
          this.setState({ companyName: '', employeeName: '', position: '' })
        })
        .catch(err => {
          console.log(err, "Employee was not added.")
          this.setState({ companyName: '', employeeName: '', position: '' })
        })
    }
  }

  deleteCompany = (id: any) => {
    axios.delete('api/companies/' + id)
      .then(res => {
        console.log(res, "Deleted")
        this.getAllCompanies()
        const compIdsCopy = this.state.company_Ids.filter((item) => item !== id);
        this.setState({ company_Ids: compIdsCopy })
      })
      .then(err => {
        console.log(err)
      })
  }

  deleteEmployee = (id: any) => {
    axios.delete('api/employees/' + id)
      .then(res => {
        console.log(res, "Deleted")
        this.getAllEmployees()
      })
      .then(err => {
        console.log(err)
      })
  }

  setIdEdit = (id: any, company_name: string) => {
    this.setState({ idEdit: id, editCompany: { id, company_name } })
  }

  setIdEmpEdit = (id: any, company_name: string, employee_name: string, employee_position: string) => {
    this.setState({ idEmpEdit: id, editEmployee: { company_name, id, employee_name, employee_position } })
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/login">
              <Link to="/register"><button className="routeBtn">Register</button></Link>
              <Login />
            </Route>
            <Route exact path="/register">
              <Link to="/login"><button className="routeBtn">Login</button></Link>
              <Register regUname={this.state.regUname} regPass={this.state.regPass} regConfirmPass={this.state.regConfirmPass} inputRegUname={this.inputRegUname} inputRegPass={this.inputRegPass} inputRegConfirmPass={this.inputRegConfirmPass} register={this.register}></Register>
            </Route>

            <PrivateRoute exact path="/">
              <div className="activity">
                <button className="signOutBtn" onClick={this.logout}>Sign Out</button><br /><br />
                <h1 className="header">Companies</h1>
                <Company
                  editCompany={this.state.editCompany}
                  newCompanyName={this.state.newCompanyName}
                  inputNewCompanyName={this.inputNewCompanyName}
                  getAllCompanies={this.getAllCompanies}
                  setIdEdit={this.setIdEdit}
                  idEdit={this.state.idEdit}
                  companies={this.state.companies}
                  companyName={this.state.companyName}
                  deleteCompany={this.deleteCompany}
                  inputCompName={this.inputCompName}
                  addInputCompany={this.addInputCompany} />
              </div>
              <div className="employees">
                <h1 className="header">Employees</h1>
                <Employee
                  editEmployee={this.state.editEmployee}
                  handleEdit={this.handleEdit}
                  inputNewEmployeeName={this.inputNewEmployeeName}
                  inputNewPosition={this.inputNewPosition}
                  inputNewEmployeeCompany={this.inputNewEmployeeCompany}
                  positions={this.state.positions}
                  setIdEmpEdit={this.setIdEmpEdit}
                  idEmpEdit={this.state.idEmpEdit}
                  company_Names={this.state.company_Names}
                  company_Ids={this.state.company_Ids}
                  employees={this.state.employees}
                  companyName={this.state.companyName}
                  employeeName={this.state.employeeName}
                  position={this.state.position}
                  deleteEmployee={this.deleteEmployee}
                  inputCompId={this.inputCompId}
                  inputEmpName={this.inputEmpName}
                  inputEmpPosition={this.inputEmpPosition}
                  addInputEmployee={this.addInputEmployee}
                  options={this.options} />
              </div>
            </PrivateRoute>

            <Route path="*">
              <div>
                <img alt="404 no found" src={image}></img>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
