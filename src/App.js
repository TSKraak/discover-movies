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

const NotFound = () => {
  return <h3>Oops, sorry. Page doesn't exist.</h3>;
};

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
        <Route exact path="/discover" component={DiscoverMoviesPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/" component={HomePage} />
        <Route path="/" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
