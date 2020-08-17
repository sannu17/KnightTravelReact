import React from "react";
import { Route, Switch } from "react-router-dom";
import EmployeeLogin from "../components/employeeLogin/EmployeeLogin";
import AddEmployee from "../components/employeeAdd/AddNewEmployee";
import KnightTour from "../components/knightTour/KnightTour";
import SpaceXLaunch from "../components/spaceXLaunch/SpaceXLaunch";

function PrivateRoute() {
  return (
    <Switch>
      <Route exact path="/" component={SpaceXLaunch}></Route>
      <Route exact path="/filter/:id" component={SpaceXLaunch}></Route>
      <Route exact path="/knightTour" component={KnightTour}></Route>
      <Route exact path="/login" component={EmployeeLogin}></Route>
      <Route exact path="/addEmployee" component={AddEmployee}></Route>
    </Switch>
  );
}

export default PrivateRoute;
