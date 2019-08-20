import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import GameList from "./components/GameList";
import "./styles/main.scss";

async function fetchGames(loading) {
  loading(true);
  const LAMBDA_API = `/.netlify/functions/async-games`;
  const res = await fetch(LAMBDA_API);
  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = { games: [] };
  }
  loading(false);
  // console.log(data.games);
  return data.games;
}

export default function App() {
  const [games, setGames] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGames(setLoading).then(setGames);
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" align="center" paragraph>
        Serie A Matches
      </Typography>

      <Container maxWidth="md">
        {loading ? <div>LOADING...</div> : <GameList games={games} />}
      </Container>
    </Container>
  );
}
