import React, { useState } from "react";
import axios from "axios";
import "../style/global.scss";
import "./DiscoverMoviesPage.scss";

export default function DiscoverMoviesPage() {
  const [searchText, setSearchText] = useState(
    localStorage.getItem("search") || ""
  );
  const [searchState, setSearchState] = useState("Idle");
  const [searchResult, setSearchResult] = useState("");
  // console.log("searchText:", searchText);

  const searchMovies = (event) => {
    // console.log("What is event?", event);
    event.preventDefault(); // in case of using a <form> this is needed to prevent refreshing
    localStorage.setItem("search", event.target.value);
    setSearchText(event.target.value);
  };

  // const search = (text) => { // If App.js would fetch the data and perform the search you would use this function
  //   // console.log("What is text?", text);
  //   findMovies(text);
  //   localStorage.removeItem("name");
  //   setSearchText("");
  // };

  const search = async (event) => {
    // console.log("Searching for:", searchText);

    event.preventDefault(); // in case of using a <form> this is needed to prevent refreshing
    setSearchState("Searching..");
    // Best practice: encode the string so that special characters
    //  like '&' and '?' don't accidentally mess up the URL
    const queryParam = encodeURIComponent(searchText);
    const url = `https://omdbapi.com/?apikey=c9cf54c2&s=${queryParam}`;

    const fetchResult = await axios.get(url);

    // console.log("What is the result?", fetchResult.data);

    if (fetchResult.data.Search) {
      localStorage.removeItem("search");
      setSearchText("");
      setSearchState("Done");
      setSearchResult(fetchResult.data.Search);
    } else {
      setSearchState("No results");
    }
  };
  // console.log(searchResult);

  // const searchResultArray = [...searchResult];
  const showResults = [...searchResult].map((result) => {
    const { Poster, Title, Year, imdbID } = result;
    return (
      <div className="MovieCard col d-flex align-items-stretch" key={imdbID}>
        <div className="card-body">
          <p className="Title card-title">Title: {Title}</p>
          <p className="Year card-text">Released: {Year}</p>
          <p className="id card-text">ID: {imdbID}</p>
          <p className="Poster">
            <img src={Poster} alt={Title} />
          </p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <form>
        <label className="search-label">Find movies: </label>
        <input
          className="search-field"
          value={searchText}
          placeholder="Search for.."
          onChange={searchMovies}
        />
        <input
          className="search-button"
          type="submit"
          value="Search"
          onClick={search}
        />
      </form>
      <p className="search-status">Status: {searchState}</p>
      <div className="card-deck m-2">{showResults}</div>

      {/* <input
        type="text"
        placeholder="Search for.."
        value={searchText}
        onChange={searchMovies}
      />
      <button onClick={search}>Search</button>{" "} */}
    </div>
  );
}
