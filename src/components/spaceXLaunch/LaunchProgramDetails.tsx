import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  filter: {
    fontWeight: "bold",
  },
  satImage: {
    height: 150,
    width: 150,
  },
}));
interface IState {
  userName: string;
  password: string;
}
interface ISpaceLaunchData {
  spaceLaunchData: any;
}
function LaunchProgramDetails({ spaceLaunchData }: ISpaceLaunchData) {
  const classes = useStyles();
  const createMissionList = (missionData: any) => (
    <ul>
      {missionData.map((el: any, index: number) => (
        <li key={index}>{el}</li>
      ))}
    </ul>
  );
  return (
    <>
      {spaceLaunchData.map((el: any, index: number) => {
        return (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Paper elevation={0} className={classes.paper}>
              <div style={{ background: "lightgrey" }}>
                <img
                  src={el.links.mission_patch_small}
                  className={classes.satImage}
                />
              </div>
              <Typography align="left" className={classes.filter}>
                {el.mission_name || "N/A"} #{el.flight_number || "N/A"}
              </Typography>
              <Typography component="div" align="left">
                <span className={classes.filter}>Mission Ids:</span>{" "}
                {createMissionList(el.mission_id)}
              </Typography>
              <Typography align="left">
                <span className={classes.filter}>Launch Year:</span>
                {el.launch_year || "N/A"}
              </Typography>
              <Typography align="left">
                <span className={classes.filter}>Successful Launch:</span>
                {el.launch_success === undefined || el.launch_success === null
                  ? " N/A"
                  : ` ${el.launch_success}`}
              </Typography>
              <Typography align="left">
                <span className={classes.filter}>Successful Landing:</span>
                {el.launch_landing === undefined || el.launch_landing === null
                  ? " N/A"
                  : ` ${el.launch_landing}`}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </>
  );
}

export default LaunchProgramDetails;
