import "../../resources/scss/component.scss";
import User from "../../contexts/user";
import { useContext, useState, useRef } from "react";
import { Popover, Overlay } from "react-bootstrap";
import { removeItem } from "../../utils/localStorage";
import return_arrow from "../../resources/images/arrow_back_black_24dp.svg";
import menu_hamburger from "../../resources/images/menu_hamburger.svg";
import { Link } from "react-router-dom";

const Header = ({
  title,
  srcImg,
  classNameImg,
  showLoggedUser = true,
  showMenu = true,
  returnPath,
}) => {
  const { user, setUser } = useContext(User);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const logOffUser = () => {
    setUser(null);
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
      {returnPath && (
        <Link className="back_arrow" to={returnPath}>
          <img src={return_arrow} alt="back arrow" />
        </Link>
      )}
      {showMenu && (
        <div className="menu_hamburger" onClick={showSideNavbar}>
          <img src={menu_hamburger} alt="Menu" />
        </div>
      )}

      {srcImg && <img className={classNameImg} src={srcImg}></img>}
      <h1 className="header-title">{title}</h1>
      {showLoggedUser &&
        (user ? (
          <div className="header-logged-user" ref={ref} onClick={handleClick}>
            {user && user.username && user.username.substring(0, 2)}
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
                  Se déconnecter
                </Popover.Content>
              </Popover>
            </Overlay>
          </div>
        ) : (
          <div className="header-log-in">
            <Link to="/login">Connexion</Link>
          </div>
        ))}
    </header>
  );
};

export default Header;
