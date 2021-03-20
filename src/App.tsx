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
  company_id: string,
  id: string,
  employee_name: string,
  employee_position: string
}

interface IState {
  register: boolean,
  login: boolean,
  showEditCompany: boolean,
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
  usernames: string[],
  users: any[],
  apiResponse: string
}

class App extends react.Component<any, IState> {
  state: IState = {
    register: false,
    login: true,
    showEditCompany: false,
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
    usernames: [],
    users: [],
    apiResponse: ''
  };

  componentDidMount = () => {
    this.getAllCompanies()
    this.getAllEmployees()
    this.getAllUsernames()
  }

  triggerEditCompany = () => {
    this.setState({ showEditCompany:true })
  }

  triggerRegister = () => {
    this.setState({ login: false, register: true })
  }

  triggerLogin = () => {
    this.setState({ login: true, register: false })
  }

  getAllCompanyIds = () => {
    let ids: string[] = []
    this.state.companies.forEach(item => {
      ids.push(item.id)
    })
    this.setState({ company_Ids: ids })
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
    if (name == "companyId") {
      const comp_ids = this.state.companies.map((item) => item.id)
      if (comp_ids.includes(value)) {
        console.log("sucess")
      } else {
        alert("Company does not exist!");
        Array.from(document.querySelectorAll('input')).forEach(
          input => (input.value = '')
        );
        this.setState({ companyId: '' })
      }
    }
    this.setState({ companyId: value });
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
        Array.from(document.querySelectorAll('input')).forEach(
          input => (input.value = '')
        );
        this.setState({ regUname: '', regPass: '', regConfirmPass: '' })
      } else {
        if (this.state.usernames.includes(regUname)) {
          alert("Username already exist!")
          Array.from(document.querySelectorAll('input')).forEach(
            input => (input.value = '')
          );
          this.setState({ regUname: '', regPass: '', regConfirmPass: '' })
        } else {
          axios.post('api/user/register', newAccount)
            .then(res => {
              alert("Sucessfully registered. Sign In now.");
              this.setState({ login: true })
            })
            .catch(err => {
              alert("Registration failed.");
              this.setState({ register: true })
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
            this.setState({ login: false, register: false })
          } else {
            console.log("Invalid credentials!")
            this.setState({ login: true })
          }
        })
        .catch(err => {
          console.log(err, "ERROR")
        })
    }
  }

  getAllCompanies = () => {
    axios.get('api/companies').then(res => {
      this.setState({ companies: res.data })
      this.getAllCompanyIds()
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
      Array.from(document.querySelectorAll('input')).forEach(
        input => (input.value = '')
      );
      this.setState({ companyName: '' })
    } else {
      axios.post('api/company', { company_name: this.state.companyName })
        .then(res => {
          console.log(res, "Company added successfully!")
          this.getAllCompanies()
          this.getAllCompanyIds()
          console.log("companies", this.state.companies)
          console.log("COMPID", this.state.company_Ids[0])
          Array.from(document.querySelectorAll('input')).forEach(
            input => (input.value = '')
          );
          this.setState({ companyName: '' })
        })
        .catch(err => {
          console.log(err, "Company was not added.")
        })
    }
  }

  addInputEmployee = () => {

    axios.post('api/employee', { company_id: this.state.companyId, employee_name: this.state.employeeName, employee_position: this.state.position })
      .then(res => {
        console.log("Employee added successfully!", res)
        this.getAllEmployees()
        console.log(this.state.employees)
        console.log("EMP ID", res.data.company.generated_keys[0])
        Array.from(document.querySelectorAll('input')).forEach(
          input => (input.value = '')
        );
        this.setState({ companyId: '', employeeName: '', position: '' })
      })
      .catch(err => {
        console.log(err, "Employee was not added.")
      })
  }

  editCompany = () => {

  }

  editEmployee = () => {

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


  render() {
    const { login, register } = this.state;
    if (login === false && register === false) {
      return (
        <div className="">
          <div className="activity">
            <button className="signOutBtn">Sign Out</button><br /><br />
            <h1 className="header">Companies</h1>
            <Company showEditCompany={this.state.showEditCompany} triggerEditCompany={this.triggerEditCompany} companies={this.state.companies} companyName={this.state.companyName} deleteCompany={this.deleteCompany} editCompany={this.editCompany} inputCompName={this.inputCompName} addInputCompany={this.addInputCompany} />
          </div>
          <div className="employees">
            <h1 className="header">Employees</h1>
            <Employee company_Ids={this.state.company_Ids} employees={this.state.employees} companyId={this.state.companyId} employeeName={this.state.employeeName} position={this.state.position} editEmployee={this.editEmployee} deleteEmployee={this.deleteEmployee} inputCompId={this.inputCompId} inputEmpName={this.inputEmpName} inputEmpPosition={this.inputEmpPosition} addInputEmployee={this.addInputEmployee} options={this.options} />
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
