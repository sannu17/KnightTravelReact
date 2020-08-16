import React from "react";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { IFluxAction, Optional } from "../commonTypes";
import { lime } from "@material-ui/core/colors";
import axios from "axios";
import LaunchProgramDetails from "./LaunchProgramDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "lightgrey",
    width: "100%",
    height: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  marginItem: {
    marginTop: "10px",
  },
  filter: {
    fontWeight: "bold",
  },
  filterCriteria: {
    textDecoration: "underline",
    marginTop: "25px",
  },
  filterButtonContainer: {
    marginTop: "5px",
  },
  marginButton: {
    margin: theme.spacing(1),
  },
  satImage: {
    height: 150,
    width: 150,
  },
  selected: {
    backgroundColor: lime[700],
  },
}));
interface IState {
  launchYear: any[];
  spaceLaunchData: any[];
}
const initialState = {
  launchYear: [],
  spaceLaunchData: [],
};
const stateReducer = (state: IState, action: IFluxAction) => {
  const { payload, type: actionType } = action;
  const newState = { ...state, ...payload };
  const updatedState: Optional<IState> = {};
  switch (actionType) {
    default:
      break;
  }
  return {
    ...newState,
    ...updatedState,
  };
};
function SpaceXLaunch(props: any) {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(stateReducer, initialState);
  const successfulLand = React.useRef();
  const successfulLaunch = React.useRef();
  const launchYearVal = React.useRef();
  const selectedButton = React.useRef(null);
  const basePath = React.useRef("/filter/");
  const { launchYear, spaceLaunchData } = state;
  const getLaunchYear = (data: any) => {
    const yearList: any[] = [];
    data.forEach((element: any) => {
      yearList.push(element.launch_year);
    });
    dispatch({
      payload: { launchYear: [...Array.from(new Set(yearList))] },
      type: "launchYear",
    });
  };
  const getSpaceLaunchData = () => {
    axios({
      method: "get",
      params: {
        launch_success: successfulLaunch.current,
        land_success: successfulLand.current,
        launch_year: launchYearVal.current,
      },
      url: `https://api.spaceXdata.com/v3/launches?limit=100`,
    })
      .then((response) => {
        dispatch({
          payload: { spaceLaunchData: response.data },
          type: "updateLaunchData",
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const getAllSpaceLaunchData = () => {
    axios({
      method: "get",
      url: `https://api.spaceXdata.com/v3/launches?limit=100`,
    })
      .then((response) => {
        getLaunchYear(response.data);
        dispatch({
          payload: { spaceLaunchData: response.data },
          type: "updateLaunchData",
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  React.useEffect(() => {
    getAllSpaceLaunchData();
  }, []);
  const onSuccessfulLaunchClick = (e: any) => {
    const clickedButton = e.currentTarget.id;
    successfulLaunch.current = clickedButton;
    props.history.push(
      `${basePath.current}launch_year=${launchYearVal.current}&launch_success=${successfulLaunch.current}&land_success=${successfulLand.current}`
    );
    getSpaceLaunchData();
  };
  const onSuccessfulLandingClick = (e: any) => {
    const clickedButton = e.currentTarget.id;
    successfulLand.current = clickedButton;
    props.history.push(
      `${basePath.current}launch_year=${launchYearVal.current}&launch_success=${successfulLaunch.current}&land_success=${successfulLand.current}`
    );
    getSpaceLaunchData();
  };
  const onLaunchYearClick = (e: any, selected: any) => {
    selectedButton.current = selected;
    const clickedButton = e.currentTarget.id;
    launchYearVal.current = clickedButton;
    props.history.push(
      `${basePath.current}launch_year=${launchYearVal.current}&launch_success=${successfulLaunch.current}&land_success=${successfulLand.current}`
    );
    getSpaceLaunchData();
  };
  const LaunchYearButton = withStyles((theme) => ({
    root: {
      width: "60%",
      color: theme.palette.getContrastText(lime[500]),
      backgroundColor: lime[500],
      "&:hover": {
        backgroundColor: lime[700],
      },
    },
  }))(Button);

  const launchYearCreator = () => (
    <>
      {launchYear.map((el: any, index: number) => (
        <Grid item xs={6} sm={6} lg={6} key={index}>
          <LaunchYearButton
            id={el}
            variant="contained"
            onClick={(e) => onLaunchYearClick(e, el)}
            style={{
              backgroundColor:
                el === selectedButton.current ? lime[700] : lime[500],
            }}
          >
            {el}
          </LaunchYearButton>
        </Grid>
      ))}
    </>
  );
  const successfulLaunchCreator = () => (
    <>
      <Grid item xs={6} sm={6} lg={6}>
        <LaunchYearButton
          id="true"
          variant="contained"
          color="primary"
          onClick={onSuccessfulLaunchClick}
        >
          True
        </LaunchYearButton>
      </Grid>
      <Grid item xs={6} sm={6} lg={6}>
        <LaunchYearButton
          id="false"
          variant="contained"
          color="primary"
          onClick={onSuccessfulLaunchClick}
        >
          False
        </LaunchYearButton>
      </Grid>
    </>
  );
  const successfulLandingCreator = () => (
    <>
      <Grid item xs={6} sm={6} lg={6}>
        <LaunchYearButton
          id="true"
          variant="contained"
          color="primary"
          onClick={onSuccessfulLandingClick}
        >
          True
        </LaunchYearButton>
      </Grid>
      <Grid item xs={6} sm={6} lg={6}>
        <LaunchYearButton
          id="false"
          variant="contained"
          color="primary"
          onClick={onSuccessfulLandingClick}
        >
          False
        </LaunchYearButton>
      </Grid>
    </>
  );
  const handleClearFilter = () => {
    successfulLaunch.current = undefined;
    successfulLand.current = undefined;
    launchYearVal.current = undefined;
    props.history.push(`/`);
    getSpaceLaunchData();
  };
  const filterCreator = () => (
    <Paper elevation={0} className={classes.paper}>
      <Typography align="left" className={classes.filter}>
        Filters
      </Typography>
      <Button variant="outlined" onClick={handleClearFilter}>
        Clear Filter
      </Button>
      <Typography className={classes.filterCriteria}>Launch Year</Typography>
      <Grid container spacing={3} className={classes.filterButtonContainer}>
        {launchYearCreator()}
      </Grid>
      <Typography className={classes.filterCriteria}>
        Successful Launch
      </Typography>
      <Grid container spacing={3} className={classes.filterButtonContainer}>
        {successfulLaunchCreator()}
      </Grid>
      <Typography className={classes.filterCriteria}>
        Successful Landing
      </Typography>
      <Grid container spacing={3} className={classes.filterButtonContainer}>
        {successfulLandingCreator()}
      </Grid>
    </Paper>
  );

  return (
    <div className={classes.root}>
      <h2 className={classes.marginItem}> SpaceX Launch programs</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={3} className={classes.marginItem}>
          {filterCreator()}
        </Grid>
        <Grid item xs={12} sm={12} lg={9} className={classes.marginItem}>
          <Grid container spacing={3}>
            <LaunchProgramDetails spaceLaunchData={spaceLaunchData} />
          </Grid>
        </Grid>
      </Grid>
      <h3 style={{ textAlign: "center" }}>Developed by: Archana Singh</h3>
    </div>
  );
}

export default withRouter(SpaceXLaunch);
