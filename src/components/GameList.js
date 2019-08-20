import React, { useState } from "react";
import { Container, Paper } from "@material-ui/core";
import DayPicker from "./DayPicker";
import Game from "./Game";
import GameModal from "./GameModal";

export default function GameList({ games }) {
  const [day, setDay] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState([]);
  const [news, setNews] = useState([]);

  function handleClickOpen() {
    setOpen(true);
    console.log("click");
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <GameModal
        handleClose={handleClose}
        open={open}
        game={selectedGame}
        news={news}
      />
      <Paper>
        <DayPicker
          day={day}
          setDay={setDay}
          rounds={Object.keys(games).length}
        />
      </Paper>
      <Container>
        {games[`${day}`]
          ? games[`${day}`].map((game, i) => (
              <Game
                key={i}
                handleClickOpen={handleClickOpen}
                game={game}
                setSelectedGame={setSelectedGame}
                setNews={setNews}
              />
            ))
          : null}
      </Container>
    </>
  );
}
