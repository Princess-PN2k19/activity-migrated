import './App.css';
import * as react from 'react';
import axios from 'axios';
import Register from './Register';
import Login from './Login';
import Company from './Company';
import Employee from './Employee';
import EditCompany from './EditCompany';

interface ICredential {
  username: string,
  password: string
}

interface ICompany {
  id: string,
  company_name: string
}

interface IEmployee {
  employee_id: string,
  id: string,
  employee_name: string,
  employee_position: string
}

interface IState {
  register: boolean,
  login: boolean,
  show: boolean,
  credentials: ICredential,
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
  apiResponse: string
}

class App extends react.Component<any, IState> {
  state: IState = {
    register: false,
    login: false,
    show: false,
    credentials: {
      username: 'PJ',
      password: 'pj'
    },
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
    apiResponse: ''
  };

  componentDidMount() {
    this.getAllCompanies()
    this.getAllEmployees()
  }

  callAPI() {
    fetch("http://localhost:5000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  options = (i: number) => {
    return <option key={i}>{i}</option>
  }

  inputCompName = (e: any) => {
    const { value } = e.target;
    this.setState({ companyName: value });
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

  login = () => {
    const { uname, pass } = this.state;
    const { username, password } = this.state.credentials;
    console.log("CREDENTIALS", uname, pass)
    // const userAccount = {
    //   username: uname,
    //   password: pass
    // };
    // axios.post('api/user/login', userAccount)
    //   .then(res => {
    //     console.log("RES", res)
    //     if (res.data.error === false) {
    //       this.setState({ login: true })
    //     } else {
    //       console.log(res, "Invalid credentials!")
    //       this.setState({ login: false })
    //     }

    //   })
    //   .catch(err => {
    //     console.log(err, "ERROR")
    //   })
    if (uname === username && pass === password) {
      this.setState({ login: true })
    } else {
      this.setState({ login: false })
      alert("Invalid login credentials!")
      Array.from(document.querySelectorAll('input')).forEach(
        input => (input.value = '')
      );
      this.setState({ uname: '' })
      this.setState({ pass: '' })
    }
  }
  togglePop = () => {
    this.setState({ show: !this.state.show });
  };

  onClose = () => {
    this.setState({ show: this.state.show });
  }

  getAllCompanies = () => {
    axios.get('api/companies').then(res => {
      console.log(res.data)
      this.setState({ companies: res.data })
    })
  }

  getAllEmployees = () => {
    axios.get('api/employees').then(res => {
      console.log(res.data)
      this.setState({ employees: res.data })
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
          this.setState({ id: res.data.company.generated_keys[0] })
          this.setState({ company_Ids: [...this.state.company_Ids, this.state.id] })
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
    axios.post('api/employee', { employee_name: this.state.employeeName })
      .then(res => {
        console.log("Employee added successfully!")
        this.getAllEmployees()
        this.setState({ employee_id: res.data.company.generated_keys[0] })
        Array.from(document.querySelectorAll('input')).forEach(
          input => (input.value = '')
        );
        this.setState({ companyId: '' })
        this.setState({ employeeName: '' })
        this.setState({ position: '' })
      })
      .catch(err => {
        console.log(err, "Employee was not added.")
      })
  }

  editCompany = () => {

  }

  deleteCompany = (id: any) => {
    console.log("ID", id)
    const compCopy = this.state.companies.filter((item) => item.id !== id);
    this.setState({ companies: compCopy })
    const compIdsCopy = this.state.company_Ids.filter((item) => item !== id);
    this.setState({ company_Ids: compIdsCopy })
    alert("Successfully deleted!");
  }

  editEmployee = () => {

  }

  deleteEmployee = (id: any) => {
    console.log("WOOOOOOOOOOO", id)
    const empCopy = this.state.employees.filter((item) => item.employee_id !== id);
    this.setState({ employees: empCopy })
    alert("Successfully deleted!");
  }

  render() {
    const { register, login } = this.state;
    if (!login) {
      return (
        <div>
          <p className="App-intro">;{this.state.apiResponse}</p>
          <Login inputUname={this.inputUname} inputPass={this.inputPass} login={this.login}></Login>
        </div>
      );
    } else {
      return (
        <div className="">
          <div className="activity">
            <h1 className="header">Companies</h1>
            <Company togglePop={this.togglePop} companies={this.state.companies} companyName={this.state.companyName} deleteCompany={this.deleteCompany} editCompany={this.editCompany} inputCompName={this.inputCompName} addInputCompany={this.addInputCompany} />
            <EditCompany show={this.state.show} />
          </div>
          <div className="employees">
            <h1 className="header">Employees</h1>
            <Employee company_Ids={this.state.company_Ids} employees={this.state.employees} companyId={this.state.companyId} employeeName={this.state.employeeName} position={this.state.position} editEmployee={this.editEmployee} deleteEmployee={this.deleteEmployee} inputCompId={this.inputCompId} inputEmpName={this.inputEmpName} inputEmpPosition={this.inputEmpPosition} addInputEmployee={this.addInputEmployee} options={this.options} />
          </div>
        </div>
      );
    }
  }
}
export default App;
