import React from "react";
import "../../styles/Login.css";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as validUsersData from "../../mock/validUserData.json";
import { setValidUser, getValidUser } from "../../store/localStore";
import { withRouter } from "react-router-dom";

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
interface IState {
  userName: string;
  password: string;
}
const initialState = {
  userName: "",
  password: "",
};
const stateReducer = (state: IState, action: any) => {
  switch (action.type) {
    case "updateUserName":
      return {
        ...state,
        userName: action.payload.userName,
      };
    case "updatePassword":
      return {
        ...state,
        password: action.payload.password,
      };
    default:
      return state;
  }
};
function EmployeeLogin(props: any) {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(stateReducer, initialState);
  const { userName, password } = state;
  const handleUsernameChange = (e: any) => {
    dispatch({
      payload: { userName: e.target.value },
      type: "updateUserName",
    });
  };

  const handlePasswordChange = (e: any) => {
    dispatch({
      payload: { password: e.target.value },
      type: "updatePassword",
    });
  };

  const handleSubmit = () => {
    const validUsersData = JSON.parse(getValidUser());
    if (validUsersData && validUsersData.default.length) {
      const userFound = validUsersData.default.find(
        (user: any) =>
          user.userName === state.userName && user.password === state.password
      );
      if (userFound) {
        console.log("success");
        props.history.push("/addEmployee");
      } else {
        console.log("failure");
      }
    }
  };

  React.useEffect(() => {
    const validUserData = JSON.stringify(validUsersData);
    setValidUser(validUserData);
  }, []);

  return (
    <div className={classes.form}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-full-width"
            label="Username"
            style={{ margin: 8 }}
            placeholder="username ..."
            margin="normal"
            value={userName}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField
            id="standard-full-width"
            label="Password"
            style={{ margin: 8 }}
            placeholder="password ..."
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(EmployeeLogin);
