import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";

async function fetchNews(search, date, loading) {
  const LAMBDA_API = `/.netlify/functions/async-news?searchTerm=${search}`;
  const res = await fetch(LAMBDA_API);
  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = { articles: {} };
  }
  return data.articles;
}

function getEarlierDate(days = 0) {
  const today = new Date();
  today.setDate(today.getDate() - days);

  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
}

export default function Game({
  game,
  handleClickOpen,
  setSelectedGame,
  setNews
}) {
  const [loading, setLoading] = useState(false);
  const searchTerm = `${game.homeTeam.team_name}%20${game.awayTeam.team_name}`;
  const date = getEarlierDate(14); // 14 days earlier than today

  return (
    <Paper
      className="game"
      onClick={() => {
        fetchNews(searchTerm, date, setLoading).then(setNews);
        setSelectedGame(game);
        handleClickOpen();
      }}
    >
      <Typography variant="h5" component="p" paragraph>{`${
        game.homeTeam.team_name
      } vs ${game.awayTeam.team_name}`}</Typography>
      <Typography variant="h5" component="p">
        {game.event_date.split("T")[0]}
      </Typography>
    </Paper>
  );
}
