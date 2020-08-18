import React, { useEffect, useState, useContext, createContext } from "react";
// import "./App.css";

import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const MOVIE_API_URL = "https://www.omdbapi.com/?s=pokemon&apikey=5b0da519";

export const GlobalContext = createContext();

function Home() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse.Search);
        setMovies(
          jsonResponse.Search.sort(
            (a, b) => parseInt(b.Year) - parseInt(a.Year)
          ).slice(0, 5)
        );
        setLoading(false);
      });
  }, []);

  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          setMovies(
            jsonResponse.Search.sort(
              (a, b) => parseInt(b.Year) - parseInt(a.Year)
            ).slice(0, 5)
          );
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };
  return (
    
      <div className="App">
        <Header text="Movies" />
        <Search search={search} />

        <div className="movies">
          {loading && !errorMessage ? (
            <span>loading...</span>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Poster</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>ImdbID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {movies.map((movie, index) => (
                    <Movie key={`${index}-${movie.Title}`} movie={movie} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
  );
}

export default Home;
