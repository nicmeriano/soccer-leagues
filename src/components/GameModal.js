import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Grid,
  Box
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import GameTab from "./GameTab";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GameModal({ handleClose, open, game, news }) {
  const classes = useStyles();
  console.log("GAME FROM MODAL: ", game);

  function toLocalTime(timestamp) {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();
    let ampm = hours >= 12 ? "PM" : "AM";
    let minutes = date.getMinutes();
    if (hours === 0) {
      hours = 12;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return `${hours}:${minutes} ${ampm}`;
  }

  return Object.keys(game).length ? (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" align="center">
            {`SERIE A • DAY 1`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacint={1}>
        <Grid item xs={12} className="modal-hero">
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            className="modal-box"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
              className="modal-team"
            >
              <div className="team-logo-wrapper">
                <img
                  className="team-logo"
                  src={`${game.homeTeam.logo}`}
                  alt={`${game.homeTeam.team_name} logo`}
                />
              </div>
              <Typography variant="h4" align="center">
                {`${game.homeTeam.team_name}`}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
              className="modal-date"
            >
              <Typography variant="h2" align="center">
                {`${toLocalTime(game.event_timestamp)}`}
              </Typography>
              <Typography variant="h6" align="center">
                {`${game.event_date.split("T")[0]}`}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
              className="modal-team"
            >
              <div className="team-logo-wrapper">
                <img
                  className="team-logo"
                  src={`${game.awayTeam.logo}`}
                  alt={`${game.awayTeam.team_name} logo`}
                />
              </div>
              <Typography variant="h4" align="center">
                {`${game.awayTeam.team_name}`}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <GameTab news={news} />
        </Grid>
      </Grid>
    </Dialog>
  ) : null;
}
