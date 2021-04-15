import './App.css';
import * as react from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import Login from './page/Login';
import Register from './page/Register';
import Company from './page/Company';
import Employee from './page/Employee';
import PrivateRoute from './helper/PrivateRoute';
import image from './image/404.jpg';
import { IState } from './types'


class App extends react.Component<any, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      companyAdd: '',
      currentUser: {
        username: ''
      },
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
      employee_id: '',
      positions: [],
      companies: [],
      employees: [],
      company_Names: [],
      usernames: [],
      allUsers: [],
      users: [],
      apiResponse: '',
      idEdit: '',
      idEmpEdit: '',
      idEmpDelete: '',
      userRole: localStorage.getItem("userRole")?localStorage.getItem("userCompany"):'',
      userCompany: localStorage.getItem("userCompany")?localStorage.getItem("userCompany"): 'all'
    };
  }

  componentDidMount() {
    this.getAllCompany()
    this.getAllEmployee()
    this.getAllUsername()
    this.getAllPosition()
    this.getAllUser()
  }

  setCurrentUser = (username: string) => {
    this.setState({ currentUser: {username} })
    const current = this.state.allUsers.find(user => user.username === this.state.currentUser.username)
    const userCompanyy = this.state.companies.find(item => item.id === current?.company)?.company_name
    userCompanyy?this.setState({ userRole: current?.role, userCompany: userCompanyy }):this.setState({ userRole: current?.role, userCompany: "all" })
    localStorage.setItem("userRole", this.state.userRole)
    userCompanyy?localStorage.setItem("userCompany", userCompanyy):localStorage.setItem("userCompany", "all")
  }

  getAllUser = async () => {
    try {
      const data = await axios.get('api/users')
      this.setState({ allUsers: data.data })
    } catch (error) {
      console.log(error)
    }
  }


  getAllCompany = async () => {
    try {
      const data = await axios.get('api/companies')
      this.setState({ companies: data.data })
      this.getAllEmployee()
    } catch (error) {
      console.log(error)
    }
  }

  getAllEmployee = async () => {
    try {
      const data = await axios.get('api/employees')
      this.setState({ employees: data.data, companyName: this.state.companies[0].company_name })
    } catch (error) {
      console.log(error)
    }
  }

  getAllUsername = async () => {
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

  logout = () => {
    this.setState({ login: true })
    localStorage.clear();
  }

  options = (i: number, index: number) => {
    return <option key={`${index}-test`}>{i}</option>
  }

  inputCompName = (e: any) => {
    const { value } = e.target;
    this.setState({ companyAdd: value });
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

  register = () => {
    const { regUname, regPass, regConfirmPass, companyName} = this.state;
    const company_Id = this.state.companies.find(company => company.company_name === this.state.companyName)
    const newAccount = {
      username: regUname,
      password: regPass,
      role: 'HR',
      company: company_Id?.id
    }
    if (companyName === '' || regUname === '' || regPass === '' || regConfirmPass === '') {
      alert("All fields are required!")
      this.setState({ regUname: '', regPass: '', regConfirmPass: '' })
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
              localStorage.setItem("username", regUname);
              localStorage.setItem("userRole", newAccount.role);
              localStorage.setItem("userCompany", companyName)
              alert("Sucessfully registered.");
              this.setState({ regUname: '', regPass: '', regConfirmPass: '' })
            })
            .catch(err => {
              alert("Registration failed.");
              this.setState({ regUname: '', regPass: '', regConfirmPass: '' })
            })
        }
      }
    }
  }

  getAllPosition = async () => {
    try {
      const data = await axios.get('api/positions')
      this.setState({ positions: data.data, position: data.data[0].role })
    } catch (error) {
      console.log(error)
    }
  }

  addInputCompany = () => {
    if (!this.state.companyAdd) {
      alert("Input field cannot be empty!");
    } else {
      axios.post('api/company', { company_name: this.state.companyAdd, status: "Active" })
        .then(res => {
          console.log(res, "Company added successfully!")
          this.getAllCompany()
          this.getAllEmployee()
          this.setState({ companyAdd: '' })
        })
        .catch(err => {
          alert("Company already exist!");
          this.getAllCompany()
          this.getAllEmployee()
          this.setState({ companyAdd: '' })
        })
    }
  }

  addInputEmployeeAdmin = () => {
    const company_Id = this.state.companies.find(company => company.company_name === this.state.companyName)
    if (this.state.employeeName === '' || this.state.companyName === '') {
      alert("All fields are required!")
      this.setState({ employeeName: '' })
    } else {
      axios.post('api/employee', { company_name: company_Id?.id, employee_name: this.state.employeeName, employee_position: this.state.position, status: "Active" })
        .then(res => {
          console.log("Employee added successfully!", res)
          this.getAllEmployee()
          this.setState({ employeeName: '' })
        })
        .catch(err => {
          alert("Employee already exist!");
          this.getAllEmployee()
          this.setState({ employeeName: '' })
        })
    }
  }

  addInputEmployee = () => {
    const company_Id = this.state.companies.find(company => company.company_name === this.state.userCompany)
    if (this.state.employeeName === '' || this.state.companyName === '') {
      alert("All fields are required!")
      this.setState({ employeeName: '' })
    } else {
      axios.post('api/employee', { company_name: company_Id?.id, employee_name: this.state.employeeName, employee_position: this.state.position, status: "Active" })
        .then(res => {
          console.log("Employee added successfully!", res)
          this.getAllEmployee()
          this.setState({ employeeName: '' })
        })
        .catch(err => {
          alert("Employee already exist!");
          this.getAllEmployee()
          this.setState({ employeeName: '' })
        })
    }
  }

  handleEditAdmin = (id: any, company: string) => {
    const company_name = this.state.companies.find(i => i.company_name === company)?.id
    if (this.state.editEmployee.company_name === "" || this.state.editEmployee.employee_name === "" || this.state.editEmployee.employee_position === "") {
      alert("All fields are required!");
    } else {
      axios.put('api/employees/' + id, { company_name: company_name, employee_name: this.state.editEmployee.employee_name, employee_position: this.state.editEmployee.employee_position })
        .then(res => {
          alert("Updated successfully!");
          this.getAllEmployee()
          this.setIdEmpEdit('', '', '', '')
        })
        .catch(err => {
          alert("Employee already exist!")
          this.getAllEmployee()
          this.setIdEmpEdit('', '', '', '')
        })
    }
  }

  handleEdit = (id: any) => {
    const company_name = this.state.companies.find(i => i.company_name === this.state.userCompany)?.id
    if (this.state.editEmployee.company_name === "" || this.state.editEmployee.employee_name === "" || this.state.editEmployee.employee_position === "") {
      alert("All fields are required!");
    } else {
      axios.put('api/employees/' + id, { company_name: company_name, employee_name: this.state.editEmployee.employee_name, employee_position: this.state.editEmployee.employee_position })
        .then(res => {
          alert("Updated successfully!");
          this.getAllEmployee()
          this.setIdEmpEdit('', '', '', '')
        })
        .catch(err => {
          alert("Employee already exist!")
          this.getAllEmployee()
          this.setIdEmpEdit('', '', '', '')
        })
    }
  }

  deleteCompany = (id: any) => {
    axios.delete('api/companies/' + id)
      .then(res => {
        console.log(res, "Deleted")
        this.getAllCompany()
      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteEmployee = (id: any) => {
    axios.delete('api/employees/' + id)
      .then(res => {
        console.log(res, "Deleted")
        this.getAllEmployee()
      })
      .catch(err => {
        console.log(err)
      })
  }

  setIdEdit = (id: any, company_name: string) => {
    this.setState({ idEdit: id, editCompany: { id, company_name } })
  }

  setIdEmpEdit = (id: any, company_name: string, employee_name: string, employee_position: string) => {
    if (company_name === ''){
      const company_name = this.state.companies[0].company_name
      this.setState({ idEmpEdit: id, editEmployee: { company_name, id, employee_name, employee_position } })
    } else {
    this.setState({ idEmpEdit: id, editEmployee: { company_name, id, employee_name, employee_position } })
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/login">
              <Link to="/register"><button className="routeBtn">Register</button></Link>
              <Login setCurrentUser={this.setCurrentUser} />
            </Route>
            <Route exact path="/register">
              <Link to="/login"><button className="routeBtn">Login</button></Link>
              <Register regUname={this.state.regUname} regPass={this.state.regPass} regConfirmPass={this.state.regConfirmPass} inputRegUname={this.inputRegUname} inputRegPass={this.inputRegPass} inputRegConfirmPass={this.inputRegConfirmPass} register={this.register} companies={this.state.companies} options={this.options} inputCompId={this.inputCompId} companyName={this.state.companyName}></Register>
            </Route>

            <PrivateRoute exact path="/">
              <div className="activity">
                <button className="signOutBtn" onClick={this.logout}>Sign Out</button><br /><br />
                <Company
                  editCompany={this.state.editCompany}
                  newCompanyName={this.state.newCompanyName}
                  inputNewCompanyName={this.inputNewCompanyName}
                  getAllCompany={this.getAllCompany}
                  setIdEdit={this.setIdEdit}
                  idEdit={this.state.idEdit}
                  companies={this.state.companies}
                  companyAdd={this.state.companyAdd}
                  deleteCompany={this.deleteCompany}
                  inputCompName={this.inputCompName}
                  addInputCompany={this.addInputCompany} />
              </div>
              <div className="employees">
                <Employee
                  companies={this.state.companies}
                  editEmployee={this.state.editEmployee}
                  handleEditAdmin={this.handleEditAdmin}
                  handleEdit={this.handleEdit}
                  inputNewEmployeeName={this.inputNewEmployeeName}
                  inputNewPosition={this.inputNewPosition}
                  inputNewEmployeeCompany={this.inputNewEmployeeCompany}
                  positions={this.state.positions}
                  setIdEmpEdit={this.setIdEmpEdit}
                  idEmpEdit={this.state.idEmpEdit}
                  employees={this.state.employees}
                  companyName={this.state.companyName}
                  employeeName={this.state.employeeName}
                  position={this.state.position}
                  deleteEmployee={this.deleteEmployee}
                  inputCompId={this.inputCompId}
                  inputEmpName={this.inputEmpName}
                  inputEmpPosition={this.inputEmpPosition}
                  addInputEmployee={this.addInputEmployee}
                  addInputEmployeeAdmin={this.addInputEmployeeAdmin}
                  options={this.options}
                  userCompany={this.state.userCompany} />
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
