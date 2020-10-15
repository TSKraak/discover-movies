import React, { useState } from "react";

export default function DiscoverMoviesPage() {
  const [searchText, setSearchText] = useState(
    localStorage.getItem("name") || ""
  );
  // console.log("searchText:", searchText);

  const searchMovies = (event) => {
    // console.log("What is event?", event);
    event.preventDefault(); // in case of using a <form> this is needed to prevent refreshing
    localStorage.setItem("name", event.target.value);
    setSearchText(event.target.value);
  };

  const search = (text) => {
    // If App.js would fetch the data you would use this function
    // console.log("What is text?", text);
    // findMovies(text);
    localStorage.removeItem("name");
    setSearchText("");
  };

  return (
    <div>
      <form>
        <label>Find movies: </label>
        <input
          value={searchText}
          placeholder="Search for.."
          onChange={searchMovies}
        />
        <input type="submit" value="Search" onClick={search} />
      </form>
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
