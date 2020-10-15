import React from "react";
import { NavLink } from "react-router-dom";
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="home">
      <h3>Welcome</h3>
      <p>
        To search for movies, go to the{" "}
        <NavLink exact to="/discover">
          Discover
        </NavLink>{" "}
        page.
      </p>
    </div>
  );
}
