import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function () {
  return (
    <div>
      <div className="NavBar">
        <NavLink
          className="home"
          exact
          to="/"
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          Home
        </NavLink>
        <NavLink
          className="discover"
          exact
          to="/discover"
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          Discover
        </NavLink>
        <NavLink
          className="about"
          exact
          to="/about"
          activeStyle={{
            fontWeight: "bold",
          }}
        >
          About
        </NavLink>
      </div>
    </div>
  );
}
