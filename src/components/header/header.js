import { useState, useRef } from "react";
import { Popover, Overlay } from "react-bootstrap";
import { removeItem } from "@utils/localStorage";
import menu_hamburger from "@images/menu_hamburger.svg";
import { Link } from "react-router-dom";
import LanguageSelection from "../languageSelection/languageSelection";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { unsetUser } from "@containers/loginPage/actions";
import "./header.scss";

const Header = ({ children, showLoggedUser = true, showMenu = true }) => {
  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);

  const ref = useRef(null);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const logOffUser = () => {
    dispatch(unsetUser());
    removeItem("user");
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
              <Overlay
                show={show}
                arrowProps={null}
                target={target}
                placement="bottom"
                container={ref.current}
                onHide={() => setShow(false)}
                rootClose={true}
                transition={false}
              >
                <Popover id="popover-contained">
                  <Popover.Content onClick={logOffUser}>
                    {t("header.label.disconnect")}
                  </Popover.Content>
                </Popover>
              </Overlay>
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
