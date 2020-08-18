import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

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
  arrayFirstValue: number;
  arraySecondValue: number;
}
const initialState = {
  arrayFirstValue: 0,
  arraySecondValue: 0,
};
const stateReducer = (state: IState, action: any) => {
  switch (action.type) {
    case "updateFistValue":
      return {
        ...state,
        arrayFirstValue: action.payload.arrayFirstValue,
      };
    case "updateSecondValue":
      return {
        ...state,
        arraySecondValue: action.payload.arraySecondValue,
      };
    default:
      return state;
  }
};

function KnightTour() {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(stateReducer, initialState);
  const { arrayFirstValue, arraySecondValue } = state;
  const N = 8;
  const isSafe = (sol: any, row: number, col: number) => {
    return row >= 0 && col >= 0 && row < N && col < N && sol[row][col] === -1;
  };

  const findTour = () => {
    let sol: number[][] = [];
    let x = [2, 1, -1, -2, -2, -1, 1, 2];
    let y = [1, 2, 2, 1, -1, -2, -2, -1];
    for (let i = 0; i < N; i++) {
      sol[i] = [];
      for (let j = 0; j < N; j++) {
        sol[i][j] = -1;
      }
    }
    sol[arrayFirstValue][arraySecondValue] = 0;
    findTourUtil(sol, 1, 0, 0, x, y);
    printSolution(sol);
  };

  const printSolution = (path: any) => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) console.log(" " + path[i][j] + " ");
      console.log();
      return null;
    }
  };

  const findTourUtil = (
    sol: any,
    moves_no: number,
    x_curr: number,
    y_curr: number,
    x: any,
    y: any
  ) => {
    if (moves_no === N * N) {
      return true;
    }
    for (let k = 0; k < 8; k++) {
      let x_next = x_curr + x[k];
      let y_next = y_curr + y[k];
      if (isSafe(sol, x_next, y_next)) {
        sol[x_next][y_next] = moves_no;
        if (findTourUtil(sol, moves_no + 1, x_next, y_next, x, y)) {
          return true;
        }
        sol[x_next][y_next] = -1;
      }
    }
    return false;
  };

  const handleFirstValueChange = (e: any) => {
    dispatch({
      payload: { arrayFirstValue: e.target.value },
      type: "updateFistValue",
    });
  };

  const handleSecondValueChange = (e: any) => {
    dispatch({
      payload: { arraySecondValue: e.target.value },
      type: "updateSecondValue",
    });
  };

  return (
    <div className={classes.form}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-full-width"
            type="number"
            label="Array first value"
            style={{ margin: 8 }}
            margin="normal"
            value={arrayFirstValue}
            onChange={handleFirstValueChange}
          />
        </div>
        <div>
          <TextField
            id="standard-full-width"
            type="number"
            label="Array second value"
            style={{ margin: 8 }}
            margin="normal"
            value={arraySecondValue}
            onChange={handleSecondValueChange}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={findTour}>
            Press me and check the console
          </Button>
        </div>
      </form>
    </div>
  );
}

export default KnightTour;
