import './App.css';
import * as react from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Company from './Company';
import Employee from './Employee';

interface ICompany {
  id: string,
  company_name: string
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
  companyId: string,
  employeeName: string,
  position: string,
  id: string,
  employee_id: string,
  companies: ICompany[],
  employees: IEmployee[],
  company_Ids: string[],
  company_Names: string[],
  usernames: string[],
  users: any[],
  apiResponse: string,
  idEdit: string,
  idEmpEdit: string
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
    companyId: '',
    employeeName: '',
    position: '',
    id: '',
    employee_id: '',
    companies: [],
    employees: [],
    company_Ids: [],
    company_Names: [],
    usernames: [],
    users: [],
    apiResponse: '',
    idEdit: '',
    idEmpEdit: ''
  };

  // componentWillMount = () => {
  //   const config = {};
  //   config.headers = {
  //     Authorization: "Bearer " + localStorage.getItem("username"), "Access-Control-Allow-Origin": "*"
  //   };
  //   this.config = config;
  // }

  componentDidMount = () => {
    this.getAllCompanies()
    this.getAllEmployees()
    this.getAllUsernames()
  }

  triggerEditCompany = () => {
    this.setState({ showEditCompany:true })
  }

  triggerEditEmployee = () => {
    this.setState({ showEditEmployee:true })
  }

  triggerRegister = () => {
    this.setState({ login: false, register: true })
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

  getAllCompanyIds = () => {
    let ids: string[] = []
    console.log("COMPANIES", this.state.companies)
    this.state.companies.forEach(item => {
      ids.push(item.id)
    })
    this.setState({ company_Names: ids })
  }

  options = (i: number) => {
    return <option key={i}>{i}</option>
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

  inputUname = (e: any) => {
    const { value } = e.target;
    this.setState({ uname: value })
  }

  inputPass = (e: any) => {
    const { value } = e.target;
    this.setState({ pass: value })
  }

  inputCompId = (e: any) => {
    const { name, value } = e.target;
    // eslint-disable-next-line
    if (name == "companyName") {
      const comp_names = this.state.companies.map((item) => item.company_name)
      if (comp_names.includes(value)) {
        console.log("sucess")
      } else {
        alert("Company does not exist!");
        this.setState({ companyName: '' })
      }
    }
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
              alert("Registration failed.");
              this.setState({ regUname: '', regPass: '', regConfirmPass: '', register: true })
            })
        }
      }
    }

  }

  login = () => {
    const { uname, pass } = this.state;
    const userAccount = {
      username: uname,
      password: pass
    };
    if (uname === '' || pass === '') {
      alert("All fields are required!")
    } else {
      axios.post('api/user/login', userAccount)
        .then(res => {
          if (res.data.error === false) {
            localStorage.setItem("username", res.data.user[0].username);
            this.setState({ login: false, register: false })
          } else {
            console.log("Invalid credentials!")
            this.setState({ uname: '', pass: '', login: true})
          }
        })
        .catch(err => {
          alert("Invalid credentials!");
          console.log(err, "ERROR")
          this.setState({ uname: '', pass: ''})
        })
    }
  }

  logout = () => {
    localStorage.removeItem("username");
    this.setState({login: true, register: true})
  }

  getAllCompanies = () => {
    axios.get('api/companies').then(res => {
      this.setState({ companies: res.data })
      this.getAllCompanyNames()
    })
  }

  getAllEmployees = () => {
    axios.get('api/employees').then(res => {
      this.setState({ employees: res.data })
    })
  }

  getAllUsernames = () => {
    axios.get('api/users').then(res => {
      this.setState({ users: res.data })
      let unames: string[] = []
      this.state.users.forEach(item => {
        unames.push(item.username)
      })
      this.setState({ usernames: unames })
    })
  }

  addInputCompany = () => {
    const company_names = this.state.companies.map((item) => item.company_name)
    if (company_names.includes(this.state.companyName)) {
      alert("Company already exist!");
      this.setState({ companyName: '' })
    } else {
      axios.post('api/company', { company_name: this.state.companyName })
        .then(res => {
          console.log(res, "Company added successfully!")
          this.getAllCompanies()
          this.getAllCompanyNames()
          this.getAllCompanyIds()
          this.setState({ companyName: '' })
        })
        .catch(err => {
          console.log(err, "Company was not added.")
          this.setState({ companyName: '' })
        })
    }
  }

  addInputEmployee = () => {
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
    console.log("ID", id)
    axios.delete('api/employees/' + id)
      .then(res => {
        console.log(res, "Deleted")
        this.getAllEmployees()
        alert("Successfully deleted!");
      })
  }

  setIdEdit = (id: any) => {
    this.setState({ idEdit: id})
  }

  setIdEmpEdit = (id: any) => {
    this.setState({ idEmpEdit: id })
  }

  render() {
    const { login, register } = this.state;
    if (login === false && register === false && localStorage.getItem("username") !== '') {
      return (
        <div className="">
          <div className="activity">
            <button className="signOutBtn" onClick={this.logout}>Sign Out</button><br /><br />
            <h1 className="header">Companies</h1>
            <Company getAllCompanies={this.getAllCompanies} setIdEdit={this.setIdEdit} idEdit={this.state.idEdit} companies={this.state.companies} companyName={this.state.companyName} deleteCompany={this.deleteCompany} inputCompName={this.inputCompName} addInputCompany={this.addInputCompany} />
          </div>
          <div className="employees">
            <h1 className="header">Employees</h1>
            <Employee getAllEmployees={this.getAllEmployees} setIdEmpEdit={this.setIdEmpEdit} idEmpEdit={this.state.idEmpEdit} company_Names={this.state.company_Names} company_Ids={this.state.company_Ids} employees={this.state.employees} companyName={this.state.companyName} employeeName={this.state.employeeName} position={this.state.position} deleteEmployee={this.deleteEmployee} inputCompId={this.inputCompId} inputEmpName={this.inputEmpName} inputEmpPosition={this.inputEmpPosition} addInputEmployee={this.addInputEmployee} options={this.options} />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          {this.state.login && <Login signUp={this.triggerRegister} inputUname={this.inputUname} inputPass={this.inputPass} login={this.login}></Login>}
          {this.state.register && <Register signIn={this.triggerLogin} inputRegUname={this.inputRegUname} inputRegPass={this.inputRegPass} inputRegConfirmPass={this.inputRegConfirmPass} register={this.register}></Register>}
        </div>
      )
    }
  }
}
export default App;
