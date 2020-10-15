import React from "react";
import { Switch, Route } from "react-router-dom";
import DiscoverMoviesPage from "./pages/DiscoverMoviesPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import "./App.css";

// const findMovies = (searchFor) => {
//   console.log("Searching in parent for:", searchFor);
// };

function App() {
  return (
    <div className="App">
      <header className="App-header">Discover Movies</header>
      <NavBar />
      <Switch>
        {/* <Route
          path="/discover"
          component={() => <DiscoverMoviesPage findMovies={findMovies} />}
        /> */}
        <Route path="/discover" component={DiscoverMoviesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
