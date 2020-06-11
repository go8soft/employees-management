import React, { Component } from "react";
import EmployeeService from "../services/employee.service";
import { Link } from "react-router-dom";

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      employees: [],
      currentEmployee: null,
      currentIndex: -1
    };
  }
  
  componentDidMount() {
    this.retrieveEmployees();
  }
  
  retrieveEmployees() {
    EmployeeService.getAll()
      .then(response => {
        this.setState({
          employees: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  setActiveEmployee(employee, index) {
      this.setState({
        currentEmployee: employee,
        currentIndex: index
      })
  }
  sortBy(criteria) {
    let employees = this.state.employees.slice();
    switch(criteria) {
      case 'age':
          employees.sort((a,b) => a.employee_age - b.employee_age)
        break;
      case 'name':
          employees.sort((a,b) => (a.employee_name > b.employee_name) ? 1 : -1)
        break;
      case 'salary':
          employees.sort((a,b) => a.employee_salary - b.employee_salary)
        break;
    }
    this.setState({
      employees: employees
    });
  }
  render() {
    const { employees, currentEmployee, currentIndex } = this.state;
    
    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Employees List</h4>
          <div>
            <span className="badge badge-info" onClick={() => this.sortBy('age')}>age</span>{" "}
            <span className="badge badge-light" onClick={() => this.sortBy('name')}>name</span>{" "}
            <span className="badge badge-pill badge-secondary" onClick={() => this.sortBy('salary')}>salary</span>
          </div>
          <ul className="list-group">
            {employees &&
                employees.map((employee, index) => (
                  <li
                    className={
                      "list-group-item " + (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveEmployee(employee, index)}
                    key={index}
                  >
                  <span className="badge badge-info">{employee.employee_age}</span>
                  {" "}{employee.employee_name}{" "}
                  <span className="badge badge-pill badge-secondary">{employee.employee_salary}</span>
                  </li>
                ))
            }
          </ul>
        </div>
        <div className="col-md-6">
          {currentEmployee ? (
            <div>
              <h4>Employee</h4>
              <div>
                <label>
                  <strong>Employee name:</strong>
                </label>{" "}
                {currentEmployee.employee_name}
              </div>
              <div>
                <label>
                  <strong>Employee age:</strong>
                </label>{" "}
                {currentEmployee.employee_age}
              </div>
              <div>
                <label>
                  <strong>Employee salary:</strong>
                </label>{" "}
                {currentEmployee.employee_salary}
              </div>
            
              <Link to={"/employees/" + currentEmployee.id} className="badge badge-warning">
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Employee...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}