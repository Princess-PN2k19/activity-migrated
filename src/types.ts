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
  
  interface ICurrentUser {
    username: string
  }
  
  interface IUser {
    id: string,
    company: string,
    password: string,
    role: string,
    username: string
  }
  
  export interface IState {
    companyAdd: string,
    currentUser: ICurrentUser,
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
    employee_id: string,
    positions: IPosition[],
    companies: ICompany[],
    employees: IEmployee[],
    company_Names: string[],
    allUsers: IUser[],
    usernames: string[],
    users: any[],
    apiResponse: string,
    idEdit: string,
    idEmpEdit: string,
    idEmpDelete: string,
    userRole: any,
    userCompany: any
  }