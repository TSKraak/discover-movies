import React, { useState, useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "../style/global.scss";
import "./DiscoverMoviesPage.scss";

export default function DiscoverMoviesPage() {
  const params = useParams();
  const history = useHistory();
  const [searchText, setSearchText] = useState(params.searchtext || "");
  const [searchState, setSearchState] = useState("Idle");
  const [searchResult, setSearchResult] = useState("");
  console.log("searchText:", searchText);

  console.log("WHAT IS PARAMS?", params);

  const searchMovies = (event) => {
    // console.log("What is event?", event);
    event.preventDefault(); // in case of using a <form> this is needed to prevent refreshing
    // localStorage.setItem("search", event.target.value);
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (searchText === "") {
      // if searchText is empty string, stop executing the useEffect so it won't run the first time the page is rendered
      return;
    }
    async function searchForMovie() {
      // console.log("Searching for:", searchText);

      // event.preventDefault(); // in case of using a <form> this is needed to prevent refreshing
      setSearchState("Searching..");
      // Best practice: encode the string so that special characters
      //  like '&' and '?' don't accidentally mess up the URL
      const queryParam = encodeURIComponent(searchText);
      const url = `https://omdbapi.com/?apikey=c9cf54c2&s=${queryParam}`;

      const fetchResult = await axios.get(url);

      // console.log("What is the result?", fetchResult.data);

      if (fetchResult.data.Search) {
        // localStorage.removeItem("search");

        setSearchState("Done");
        setSearchResult(fetchResult.data.Search);
      } else {
        setSearchState("No results");
      }
    }
    searchForMovie();
  }, [params]);

  const navigateToSearch = () => {
    const routeParam = encodeURIComponent(searchText);
    history.push(`/discover/${routeParam}`); // to push the search term to params which is assigned useHistory and shows up after the / in url
    setSearchText(routeParam);
  };
  // console.log("history is?", history);

  // const searchResultArray = [...searchResult];
  const showResults = [...searchResult].map((result) => {
    // if you want to map over an array stored in useState you need to copy it with the spread operator
    const { Poster, Title, Year, imdbID } = result;

    return (
      <div className="MovieCard col d-flex align-items-stretch" key={imdbID}>
        <div className="card-body">
          <NavLink to={`/movies/${imdbID}`}>
            <p className="Title card-title">{Title}</p>
          </NavLink>
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
          onClick={navigateToSearch}
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
