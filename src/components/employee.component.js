import React, { Component } from "react";
import EmployeeService from "../services/employee.service";

export default class Employee extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeEmployeeSalary = this.onChangeEmployeeSalary.bind(this);
    this.onChangeEmployeeAge = this.onChangeEmployeeAge.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    
    this.state = {
      currentEmployee: {
        id: null,
        employee_name: "",
        employee_salary: "",
        employee_age: "",
        profile_image: ""
      },
      message: ""
    }
  }
  
  componentDidMount() {
    this.getEmployee(this.props.match.params.id)
  }
  
  getEmployee(id) {
    EmployeeService.get(id)
      .then(response => {
        this.setState({
          currentEmployee: response.data
        })
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  onChangeEmployeeName(e) {
    const employeeName = e.target.value;
    
    this.setState(oldState => ({
      currentEmployee: {
        ...oldState.currentEmployee,
        employee_name: employeeName
      }
    }));
  }
  
  onChangeEmployeeSalary(e) {
    const employeeSalary = e.target.value;
    
    this.setState(oldState => ({
      currentEmployee: {
        ...oldState.currentEmployee,
        employee_salary: employeeSalary
      }
    }));
  }
  
  onChangeEmployeeAge(e) {
    const employeeAge = e.target.value;
    
    this.setState(oldState => ({
      currentEmployee: {
        ...oldState.currentEmployee,
        employee_age: employeeAge
      }
    }));
  }
  
  updateEmployee() {
    EmployeeService.update(
      this.state.currentEmployee.id,
      this.state.currentEmployee
    )
      .then(response => {
         console.log(response.data);
         this.setState({
           message: "The employee was updated successfully!"
         });
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  deleteEmployee() {
    EmployeeService.delete(this.state.currentEmployee.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/employees');
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  render() {
    const { currentEmployee } = this.state;
    
    return (
      <div>
        {currentEmployee.id ? (
          <div className="edit-form">
            <h4>Employee</h4>
            <form>
              <div className="form-group">
                <label htmlFor="employeeName">Employee name</label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeName"
                  value={currentEmployee.employee_name}
                  onChange={this.onChangeEmployeeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="employeeSalary">Employee salary</label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeSalary"
                  value={currentEmployee.employee_salary}
                  onChange={this.onChangeEmployeeSalary}
                />
              </div>
              <div className="form-group">
                <label htmlFor="employeeAge">Employee age</label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeAge"
                  value={currentEmployee.employee_age}
                  onChange={this.onChangeEmployeeAge}
                />
              </div>
            </form>
            
            <button
              className="badge badge-dnager mr-2"
              onClick={() => this.deleteEmployee() }
            >
              Delete
            </button>
            
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateEmployee}
            >
             Update
           </button>
           <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
             <br />
             <p>Please select an Employee...</p>
           </div>
        )}
      </div>
    );
  }
}