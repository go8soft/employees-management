import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import EmployeesList from "./components/employees-list.component";
import Employee from "./components/employee.component"
import AddEmployee from "./components/add-employee.component"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Go8Soft
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/employees"} className="nav-link">
                  Employees
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/employees"]} component={EmployeesList} />
              <Route path="/employees/:id" component={Employee} />
              <Route exact path="/add" component={AddEmployee} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;