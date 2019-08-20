import fetch from "node-fetch";
let env = process.env.NODE_ENV || 'development';
require('dotenv').config({path: `.env`});

export async function handler(event) {
  const allGames = [];
  // const baseURL = `https://api-football-v1.p.rapidapi.com/v2/fixtures/league/891`;
  const baseURL = `http://www.api-football.com/demo/api/v2/fixtures/league/2`; // demo api (only premier league 2018)

  try {
    console.log("FETCHING GAMES...");
    const res = await fetch(baseURL, {
      method: "GET",
      // body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
      }
    });

    const games = await res.json();

    

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ games: toRounds(games.api.fixtures) })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}

function toRounds(games) {
  const groupedGames = {};
  games.forEach(game => {
    const round = game.round.split('-')[1].trim();

    try {
      groupedGames[round].push(game);
    } catch {
      groupedGames[round] = [game];
    }
  });

  return groupedGames;
}
