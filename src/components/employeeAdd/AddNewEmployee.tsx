import React from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EmployeeTable from "./EmployeeTable";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  form: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    padding: "50px",
    backgroundColor: "#b2dfdb",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
  },
}));
interface ITable {
  empName: string;
  description: string;
  date: string;
  time: string;
}
interface IState {
  empName: string;
  description: string;
  date: string;
  time: string;
  empDetailsList: ITable[];
}
const initialState = {
  empName: "",
  description: "",
  date: "",
  time: "",
  empDetailsList: [],
};
const stateReducer = (state: IState, action: any) => {
  switch (action.type) {
    case "updateEmpName":
      return {
        ...state,
        empName: action.payload.empName,
      };
    case "updateDescription":
      return {
        ...state,
        description: action.payload.description,
      };
    case "updateDate":
      return {
        ...state,
        date: action.payload.date,
      };
    case "updateTime":
      return {
        ...state,
        time: action.payload.time,
      };
    case "updateTableData":
      return {
        ...state,
        empDetailsList: action.payload.empDetailsList,
      };
    default:
      return state;
  }
};

function AddEmployee() {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(stateReducer, initialState);
  const { empName, description, date, time, empDetailsList } = state;

  const handleEmpnameChange = (e: any) => {
    dispatch({
      payload: { empName: e.target.value },
      type: "updateEmpName",
    });
  };
  const handleDescriptionChange = (e: any) => {
    dispatch({
      payload: { description: e.target.value },
      type: "updateDescription",
    });
  };
  const handleDateChange = (e: any) => {
    dispatch({
      payload: { date: e.target.value },
      type: "updateDate",
    });
  };
  const handleTimeChange = (e: any) => {
    dispatch({
      payload: { time: e.target.value },
      type: "updateTime",
    });
  };

  const handleAdd = () => {
    empDetailsList.push({ empName, description, date, time });
    dispatch({
      payload: { empDetailsList },
      type: "updateTableData",
    });
  };

  const handleDeleteRowClick = (e: any, index: number) => {
    if (index > -1) {
      empDetailsList.splice(index, 1);
      dispatch({
        payload: { empDetailsList },
        type: "updateTableData",
      });
    }
  };

  return (
    <div className={classes.form}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-full-width"
            label="Employee name"
            style={{ margin: 8 }}
            placeholder="username ..."
            margin="normal"
            value={empName}
            onChange={handleEmpnameChange}
          />
        </div>
        <div>
          <TextField
            id="standard-full-width"
            label="Description"
            style={{ margin: 8 }}
            placeholder="description ..."
            margin="normal"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="date ..."
            margin="normal"
            value={date}
            onChange={handleDateChange}
            type="date"
          />
        </div>
        <div>
          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="time ..."
            margin="normal"
            value={time}
            onChange={handleTimeChange}
            type="time"
          />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </form>
      <EmployeeTable
        tableData={empDetailsList}
        onDeleteClick={handleDeleteRowClick}
      />
    </div>
  );
}

export default AddEmployee;
