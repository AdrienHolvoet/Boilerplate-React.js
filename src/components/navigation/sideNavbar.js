import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "@images/logo.svg";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

const SideNavbar = ({ routes, refSidebar }) => {
  const { t } = useTranslation();
  const isTablet = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const onClickLink = () => {
    if (isTablet) {
      sidenavbar.style.width = 0;
      overlay.style.display = "none";
    }
  };
  return (
    <section ref={refSidebar} id="sidenavbar" className="sidenavbar">
      <header className="nav-header">
        <Link to="/" onClick={onClickLink}>
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
            onClick={onClickLink}
          >
            {t(route.name)}
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default SideNavbar;
