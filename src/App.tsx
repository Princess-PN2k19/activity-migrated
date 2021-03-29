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

interface ICompany {
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

interface IState {
  register: boolean,
  login: boolean,
  showEditCompany: boolean,
  showEditEmployee: boolean,
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
  idDelete: string,
  idEmpDelete: string
}

class App extends react.Component<any, IState> {
  state: IState = {
    register: false,
    login: true,
    showEditCompany: false,
    showEditEmployee: false,
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
    idDelete: '',
    idEmpDelete: ''
  };


  componentDidMount(){
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

  triggerEditCompany = () => {
    this.setState({ showEditCompany: true })
  }

  triggerEditEmployee = () => {
    this.setState({ showEditEmployee: true })
  }

  triggerRegister = () => {
    this.getAllUsernames()
    this.setState({ login: false, register: true })
  }

  logout = () => {
    this.setState({ login: true, register: false })
    localStorage.removeItem("username");
  }

  triggerLogin = () => {
    this.setState({ login: true, register: false })
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

  choices = (id: number, index: number) => {
    return <option key={`${index}-test`}>{id}</option>
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

  // inputUname = (e: any) => {
  //   const { value } = e.target;
  //   this.setState({ uname: value })
  // }

  // inputPass = (e: any) => {
  //   const { value } = e.target;
  //   this.setState({ pass: value })
  // }

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

  inputNewCompanyName = (e: any, index: number) => {
    const { value } = e.target;
    const companies = [...this.state.companies];
    companies[index] = { ...companies[index], company_name: value };
    this.setState({ companies, newCompanyName: value });
  }

  inputNewEmployeeCompany = (e: any, index: number) => {
    const { value } = e.target;
    const employees = [...this.state.employees];
    employees[index] = { ...employees[index], company_name: value };
    this.setState({ employees, newEmployeeCompany: value });
  }

  inputNewPosition = (e: any, index: number) => {
    const { value } = e.target;
    const employees = [...this.state.employees];
    employees[index] = { ...employees[index], employee_position: value };
    this.setState({ employees, newPosition: value });
  }

  inputNewEmployeeName = (e: any, index: number) => {
    const { value } = e.target;
    const employees = [...this.state.employees];
    employees[index] = { ...employees[index], employee_name: value };
    this.setState({ employees, newEmployeeName: value });

  }

  handleEdit = (id: any) => {
    if (this.state.newEmployeeCompany === "" || this.state.newEmployeeName === "" || this.state.newPosition === "") {
      alert("All fields are required!");
    } else {
      axios.put('api/employees' + id, { company_name: this.state.newEmployeeCompany, employee_name: this.state.newEmployeeName, employee_position: this.state.newPosition })
        .then(res => {
          console.log("SUCCESS", res)
          alert("Updated successfully!");
          this.getAllEmployees()
          this.setIdEmpEdit('')
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
      if (regPass !== regConfirmPass) {
        alert("Passwords did not match!")
        this.setState({ regUname: '', regPass: '', regConfirmPass: '' })
      } else {
        console.log(this.state.usernames)
        if (this.state.usernames.includes(regUname)) {
          alert("Username already exist!")
          this.setState({ regUname: '', regPass: '', regConfirmPass: '' })
        } else {
          axios.post('api/user/register', newAccount)
            .then(res => {
              alert("Sucessfully registered. Sign in now.");
              this.setState({ regUname: '', regPass: '', regConfirmPass: '', login: true, register: false })
            })
            .catch(err => {
              console.log("acc", newAccount)
              alert("Registration failed.");
              this.setState({ regUname: '', regPass: '', regConfirmPass: '', register: true })
            })
        }
      }
    }
  }

  // login = () => {
  //   const { uname, pass } = this.state;
  //   const userAccount = {
  //     username: uname,
  //     password: pass
  //   };
  //   if (uname === '' || pass === '') {
  //     alert("All fields are required!")
  //   } else {
  //     axios.post('api/user/login', userAccount)
  //       .then(res => {
  //         if (res.data.error === false) {
  //           localStorage.setItem("username", res.data.user[0].username);
  //           history.push('/')
  //           this.setState({ login: false, register: false })
  //         } else {
  //           console.log("Invalid credentials!")
  //           this.setState({ uname: '', pass: '', login: true })
  //         }
  //       })
  //       .catch(err => {
  //         alert("Invalid credentials!");
  //         console.log(err, "ERROR")
  //         this.setState({ uname: '', pass: '' })
  //       })
  //   }
  //   this.setState({ uname: '', pass: '' })
  // }

  getAllPositions = async () => {
    try {
      const data = await axios.get('api/positions')
      console.log(data)
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
      if (this.state.companyName === '') {
        alert("Input field cannot be empty!");
      } else {
        axios.post('api/company', { company_name: this.state.companyName })
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
      axios.post('api/employee', { company_name: this.state.companyName, employee_name: this.state.employeeName, employee_position: this.state.position })
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
        alert("Successfully deleted!");
      })
  }

  deleteEmployee = (id: any) => {
    axios.delete('api/employees/' + id)
      .then(res => {
        console.log(res, "Deleted")
        this.getAllEmployees()
        alert("Successfully deleted!");
      })
  }

  setIdEdit = (id: any) => {
    this.setState({ idEdit: id })
  }

  setIdDelete = (id: any) => {
    this.setState({ idDelete: id })
  }

  setIdEmpEdit = (id: any) => {
    this.setState({ idEmpEdit: id })
  }

  setIdEmpDelete = (id: any) => {
    this.setState({ idEmpDelete: id })
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/login">
              <Login signUp={this.triggerRegister}></Login>
            </Route>
            <Route exact path="/register">
              <Register signIn={this.triggerLogin} inputRegUname={this.inputRegUname} inputRegPass={this.inputRegPass} inputRegConfirmPass={this.inputRegConfirmPass} register={this.register}></Register>
            </Route>
            <PrivateRoute exact path="/">
              <div className="activity">
                <button className="signOutBtn" onClick={this.logout}>Sign Out</button><br /><br />
                <h1 className="header">Companies</h1>
                <Company
                  newCompanyName={this.state.newCompanyName}
                  inputNewCompanyName={this.inputNewCompanyName}
                  getAllCompanies={this.getAllCompanies}
                  setIdEdit={this.setIdEdit}
                  idEdit={this.state.idEdit}
                  setIdDelete={this.setIdDelete}
                  idDelete={this.state.idDelete}
                  companies={this.state.companies}
                  companyName={this.state.companyName}
                  deleteCompany={this.deleteCompany}
                  inputCompName={this.inputCompName}
                  addInputCompany={this.addInputCompany} />
              </div>
              <div className="employees">
                <h1 className="header">Employees</h1>
                <Employee
                  handleEdit={this.handleEdit}
                  inputNewEmployeeName={this.inputNewEmployeeName}
                  inputNewPosition={this.inputNewPosition}
                  inputNewEmployeeCompany={this.inputNewEmployeeCompany}
                  positions={this.state.positions}
                  setIdEmpEdit={this.setIdEmpEdit}
                  idEmpEdit={this.state.idEmpEdit}
                  setIdEmpDelete={this.setIdEmpDelete}
                  idEmpDelete={this.state.idEmpDelete}
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
                  options={this.options}
                  choices={this.choices} />
              </div>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    )
    // if (localStorage.getItem("username") === null) {
    //   return (
    //     <Router>
    //       <div className="landing">
    //         <Link to="/login"><button className="navBtn">Login</button></Link>
    //         <Link to="/register" className="navBtn"><button >Register</button></Link>
    //         <Switch>
    //           <Route path="/login">
    //             <Login signUp={this.triggerRegister} inputUname={this.inputUname} inputPass={this.inputPass} login={this.login}></Login>
    //           </Route>
    //           <Route path="/register">
    //             <Register signIn={this.triggerLogin} inputRegUname={this.inputRegUname} inputRegPass={this.inputRegPass} inputRegConfirmPass={this.inputRegConfirmPass} register={this.register}></Register>
    //           </Route>
    //         </Switch>
    //       </div>
    //     </Router>
    //   )
    // } else if (localStorage.getItem("username") != null) {
    //   return (
    //     <Router>
    //       <div>
    //         <div className="activity">
    //           <button className="signOutBtn" onClick={this.logout}>Sign Out</button><br /><br />
    //           <h1 className="header">Companies</h1>
    //           <Company
    //             newCompanyName={this.state.newCompanyName}
    //             inputNewCompanyName={this.inputNewCompanyName}
    //             getAllCompanies={this.getAllCompanies}
    //             setIdEdit={this.setIdEdit}
    //             idEdit={this.state.idEdit}
    //             setIdDelete={this.setIdDelete}
    //             idDelete={this.state.idDelete}
    //             companies={this.state.companies}
    //             companyName={this.state.companyName}
    //             deleteCompany={this.deleteCompany}
    //             inputCompName={this.inputCompName}
    //             addInputCompany={this.addInputCompany} />
    //         </div>
    //         <div className="employees">
    //           <h1 className="header">Employees</h1>
    //           <Employee
    //             handleEdit={this.handleEdit}
    //             inputNewEmployeeName={this.inputNewEmployeeName}
    //             inputNewPosition={this.inputNewPosition}
    //             inputNewEmployeeCompany={this.inputNewEmployeeCompany}
    //             positions={this.state.positions}
    //             setIdEmpEdit={this.setIdEmpEdit}
    //             idEmpEdit={this.state.idEmpEdit}
    //             setIdEmpDelete={this.setIdEmpDelete}
    //             idEmpDelete={this.state.idEmpDelete}
    //             company_Names={this.state.company_Names}
    //             company_Ids={this.state.company_Ids}
    //             employees={this.state.employees}
    //             companyName={this.state.companyName}
    //             employeeName={this.state.employeeName}
    //             position={this.state.position}
    //             deleteEmployee={this.deleteEmployee}
    //             inputCompId={this.inputCompId}
    //             inputEmpName={this.inputEmpName}
    //             inputEmpPosition={this.inputEmpPosition}
    //             addInputEmployee={this.addInputEmployee}
    //             options={this.options}
    //             choices={this.choices} />
    //         </div>
    //       </div>
    //     </Router >
    //   )
  }
  // // const { login, register, regUname, regPass, regConfirmPass } = this.state;
  // console.log("KEY", localStorage.getItem("username"))
  // if (localStorage.getItem("username") != null) {
  //   return (
  // <div className="">
  //   <div className="activity">
  //     <button className="signOutBtn" onClick={this.logout}>Sign Out</button><br /><br />
  //     <h1 className="header">Companies</h1>
  //     <Company
  //       newCompanyName={this.state.newCompanyName}
  //       inputNewCompanyName={this.inputNewCompanyName}
  //       getAllCompanies={this.getAllCompanies}
  //       setIdEdit={this.setIdEdit}
  //       idEdit={this.state.idEdit}
  //       setIdDelete={this.setIdDelete}
  //       idDelete={this.state.idDelete}
  //       companies={this.state.companies}
  //       companyName={this.state.companyName}
  //       deleteCompany={this.deleteCompany}
  //       inputCompName={this.inputCompName}
  //       addInputCompany={this.addInputCompany} />
  //   </div>
  //   <div className="employees">
  //     <h1 className="header">Employees</h1>
  //     <Employee
  //       handleEdit={this.handleEdit}
  //       inputNewEmployeeName={this.inputNewEmployeeName}
  //       inputNewPosition={this.inputNewPosition}
  //       inputNewEmployeeCompany={this.inputNewEmployeeCompany}
  //       positions={this.state.positions}
  //       setIdEmpEdit={this.setIdEmpEdit}
  //       idEmpEdit={this.state.idEmpEdit}
  //       setIdEmpDelete={this.setIdEmpDelete}
  //       idEmpDelete={this.state.idEmpDelete}
  //       company_Names={this.state.company_Names}
  //       company_Ids={this.state.company_Ids}
  //       employees={this.state.employees}
  //       companyName={this.state.companyName}
  //       employeeName={this.state.employeeName}
  //       position={this.state.position}
  //       deleteEmployee={this.deleteEmployee}
  //       inputCompId={this.inputCompId}
  //       inputEmpName={this.inputEmpName}
  //       inputEmpPosition={this.inputEmpPosition}
  //       addInputEmployee={this.addInputEmployee}
  //       options={this.options}
  //       choices={this.choices} />
  //   </div>
  // //     </div>
  //   )
  // } else if (localStorage.getItem("username") === null){
  //   return (
  //     <div>
  //       {this.state.login && <Login signUp={this.triggerRegister} inputUname={this.inputUname} inputPass={this.inputPass} login={this.login}></Login>}
  //       {this.state.register && <Register signIn={this.triggerLogin} inputRegUname={this.inputRegUname} inputRegPass={this.inputRegPass} inputRegConfirmPass={this.inputRegConfirmPass} register={this.register}></Register>}
  //     </div>
  //   )
  // }
}

export default App;
