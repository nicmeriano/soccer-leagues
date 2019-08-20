import fetch from "node-fetch";
let env = process.env.NODE_ENV || 'development';
require('dotenv').config({path: `.env`});

export async function handler(event) {
  console.log("FETCHING NEWS...");
  let { searchTerm } = event.queryStringParameters || {};
  const pageNumber = 1;
  const pageSize = 10;
  const autoCorrect = true;
  const safeSearch = false;

  searchTerm = searchTerm.replace(/\ /g, "%20");

  const baseURL = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=${searchTerm}&amp;pageNumber=${pageNumber}&amp;pageSize=${pageSize}&amp;autoCorrect=${autoCorrect}&amp;safeSearch=${safeSearch}`;

  try {
    const res = await fetch(baseURL, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY
      }
    });

    const news = await res.json();

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ articles: news.value })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
