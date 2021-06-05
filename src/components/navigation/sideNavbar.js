import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../resources/images/logo.svg";

const SideNavbar = ({ routes }) => {
  return (
    <section className="sidenavbar">
      <header className="header">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </header>
      <div className="sidenavbar-container">
        {routes?.map((route, index) => (
          <NavLink key={index} className="sidenavbar-item" exact to={route.url}>
            {route.name}
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default SideNavbar;
