import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.scss";

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState({
    status: "Loading..",
    data: null,
  });
  const params = useParams();
  // console.log("What is params?:", params);

  useEffect(() => {
    async function fetchMovieById() {
      const url = `https://omdbapi.com/?apikey=c9cf54c2&i=${params.imdbID}`;
      const response = await axios.get(url);
      console.log("Data fetched by id:", response);
      setMovieDetails({ status: "Movie details:", data: response.data });
    }
    fetchMovieById();
  }, [params]);

  if (movieDetails.data === null) {
    return <h5>{movieDetails.status}</h5>;
  }

  const {
    Title,
    Plot,
    Actors,
    Genre,
    Runtime,
    Year,
    Poster,
    imdbRating,
  } = movieDetails.data;
  // console.log("imdbRating?", imdbRating);

  return (
    <div className="MoviePage">
      <div className="Content">
        <h1 className="Title">{Title}</h1>
        <p className="Info">
          Summary:
          <br />
          {Plot}
          <br></br>
          <br></br>
          Rating: {imdbRating}
          <br></br>
          <br></br>
          Genre: {Genre}
          <br></br>
          Runtime: {Runtime}
          <br></br>
          Released: {Year}
          <br></br>
          Actors: {Actors}
        </p>
      </div>
      <img className="Poster" src={Poster} alt="Poster" />
    </div>
  );
}

// <div>
// <h2>{Title}</h2>
// <h5>Rating: {imdbRating}</h5>
// <br></br>
// <p>Summary:</p>
// <p>{Plot}</p>
// <p>
//   Details: <br></br>
//   Genre: {Genre}
//   <br></br>
//   Runtime: {Runtime}
//   <br></br>
//   Released: {Year}
//   <br></br>
//   Actors: {Actors}
// </p>
// </div>
