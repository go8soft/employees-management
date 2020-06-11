import React, { Component } from "react";
import EmployeeService from "../services/employee.service";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeEmployeeSalary = this.onChangeEmployeeSalary.bind(this);
    this.onChangeEmployeeAge = this.onChangeEmployeeAge.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee = this.newEmployee.bind(this);
    
    this.state = {
      currentEmployee: {
        id: null,
        employee_name: "",
        employee_salary: "",
        employee_age: "",
        profile_image: ""
      },
      submitted: false
    }
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
  
  saveEmployee() {
    let data = {
      employee_name: this.state.currentEmployee.employee_name,
      employee_salary: this.state.currentEmployee.employee_salary,
      employee_age: this.state.currentEmployee.employee_age,
      profile_image: this.state.currentEmployee.profile_image
    };
    
    EmployeeService.create(data)
      .then(response => {
        this.setState(oldState => ({
          currentEmployee: {
            id: response.data.id,
            employee_name: response.data.employee_name,
            employee_salary:response.data.employee_salary,
            employee_age: response.data.employee_age,
            profile_image: response.data.profile_image
          },
          submitted: true
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  newEmployee() {
    this.setState({
      currentEmployee: {
        id: null,
        employee_name: "",
        employee_salary: "",
        employee_age: "",
        profile_image: ""
      },
      submitted: false
    });
  }
  
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You saved successfully!</h4>
            <button className="btn btn-success" onClick={this.newEmployee}>
              Add
            </button>
          </div>
        ) : ( 
          <div>
            <div className="form-group">
              <label htmlFor="employeeName">Employee name</label>
              <input
                type="text"
                className="form-control"
                id="employeeName"
                required
                value={this.state.currentEmployee.employee_name}
                onChange={this.onChangeEmployeeName}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="employeeName">Employee salary</label>
              <input
                type="text"
                className="form-control"
                id="employeeSalary"
                required
                value={this.state.currentEmployee.employee_salary}
                onChange={this.onChangeEmployeeSalary}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="employeeName">Employee age</label>
              <input
                type="text"
                className="form-control"
                id="employeeAge"
                required
                value={this.state.currentEmployee.employee_age}
                onChange={this.onChangeEmployeeAge}
                name="title"
              />
            </div>
            <button onClick={this.saveEmployee} className="btn btn-success">
              Save
            </button>
          </div>
        )}
      </div>
    );
  }
}