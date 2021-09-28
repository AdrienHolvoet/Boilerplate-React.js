import { useState, useRef } from "react";

import menu_hamburger from "@images/menu_hamburger.svg";
import { Link } from "react-router-dom";
import LanguageSelection from "../languageSelection/languageSelection";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import UserMenu from "./userMenu";

const Header = ({ children, showLoggedUser = true, showMenu = true }) => {
  const user = useSelector((state) => state.user);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const ref = useRef(null);

  const { t } = useTranslation();

  const handleClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const showSideNavbar = () => {
    const sidenavbar = document.getElementById("sidenavbar");
    sidenavbar.style.width = "50%";
    const overlay = document.getElementById("overlay");
    overlay.style.display = "unset";
  };

  return (
    <header className="header">
      {showMenu && (
        <div className="menu_hamburger" onClick={showSideNavbar}>
          <img src={menu_hamburger} alt="Menu" />
        </div>
      )}

      <h1 className="header-title">{children}</h1>
      <div className="header__logged-user__lang-container">
        <LanguageSelection />
        {showLoggedUser &&
          (user ? (
            <div className="header-logged-user" ref={ref} onClick={handleClick}>
              {user &&
                user.firstName.substring(0, 1) + user.lastName.substring(0, 1)}
              {showUserMenu && <UserMenu />}
            </div>
          ) : (
            <div className="header-log-in">
              <Link to="/login"> {t("login.page.title")}</Link>
            </div>
          ))}
      </div>
    </header>
  );
};

export default Header;
