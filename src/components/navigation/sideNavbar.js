import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../resources/images/logo.svg";
import { useMediaQuery } from "react-responsive";

const SideNavbar = ({ routes, refSidebar }) => {
  const isTablet = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const onClickNavLink = () => {
    if (isTablet) {
      sidenavbar.style.width = 0;
      overlay.style.display = "none";
    }
  };
  return (
    <section ref={refSidebar} id="sidenavbar" className="sidenavbar">
      <header className="header">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </header>
      <div className="sidenavbar-container">
        {routes?.map((route, index) => (
          <NavLink
            key={index}
            className="sidenavbar-item"
            exact
            to={route.url}
            onClick={onClickNavLink}
          >
            {route.name}
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default SideNavbar;