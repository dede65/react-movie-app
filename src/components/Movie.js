import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BZDZiYjc3MWYtODE5Mi00MDM5LWFkZTAtNjAzZmUxMzc4ZGQxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg";

export default function Movie({ movie }) {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <>
      <TableRow key={movie.imdbId}>
        <TableCell component="th" scope="row">
          <img
            width="80"
            height="120"
            alt={`The movie titled: ${movie.Title}`}
            src={movie.Poster}
          />
        </TableCell>
        <TableCell>
          <Link
            to={{
              pathname: `/details/${movie.imdbID}`,
              movie: movie,
            }}
          >
            {movie.Title}
          </Link>
        </TableCell>
        <TableCell>{movie.Type}</TableCell>
        <TableCell>{movie.Year}</TableCell>
        <TableCell>{movie.imdbID}</TableCell>
      </TableRow>
    </>
  );
}
