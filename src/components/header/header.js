import User from "@contexts/user";
import { useContext, useState, useRef } from "react";
import { Popover, Overlay } from "react-bootstrap";
import { removeItem } from "@utils/localStorage";
import return_arrow from "@images/arrow_back_black_24dp.svg";
import menu_hamburger from "@images/menu_hamburger.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { variables } from "@variable";
import { media } from "@media";
import LanguageSelection from "../languageSelection/languageSelection";
import { useTranslation } from "react-i18next";

const Header = ({
  children,
  showLoggedUser = true,
  showMenu = true,
  returnPath,
}) => {
  const { user, setUser } = useContext(User);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const { t } = useTranslation();

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
    <Wrapper>
      {returnPath && (
        <BackArrow to={returnPath}>
          <img src={return_arrow} alt="back arrow" />
        </BackArrow>
      )}
      {showMenu && (
        <Hamburger onClick={showSideNavbar}>
          <img src={menu_hamburger} alt="Menu" />
        </Hamburger>
      )}

      <Title>{children}</Title>
      <WrapperUserAndLang>
        <LanguageSelection />
        {showLoggedUser &&
          (user ? (
            <LoggedUser ref={ref} onClick={handleClick}>
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
                    {t("header.label.disconnect")}
                  </Popover.Content>
                </Popover>
              </Overlay>
            </LoggedUser>
          ) : (
            <UserLogIn>
              <Link to="/login"> {t("login.page.title")}</Link>
            </UserLogIn>
          ))}
      </WrapperUserAndLang>
    </Wrapper>
  );
};

const WrapperUserAndLang = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
`;
const Wrapper = styled.div`
  background-color: ${variables.themeColorWhite};
  height: ${variables.headerHeigth};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const BackArrow = styled(Link)`
  position: absolute;
  left: 15px;
  cursor: pointer;
`;

const Hamburger = styled.div`
  cursor: pointer;
  position: absolute;
  left: 25px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: ${variables.fontFamilyHeavy};
  font-size: 25px;
  ${media.tablet`font-size : 2.2em`}
`;

const LoggedUser = styled.div`
  background-color: ${variables.themeColorPrimary};
  height: 48px;
  width: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  padding-top: 2px;
  justify-content: center;
  color: ${variables.themeColorWhite};
  font-weight: bold;
  cursor: pointer;
  right: 5px;
  text-transform: uppercase;
  cursor: pointer;

  .popover {
    box-shadow: 0 24px 54px rgb(0 0 0 / 15%), 0 4.5px 13.5px rgb(0 0 0 / 8%);
    border: none !important;
    font-family: ${variables.fontFamily};
    width: 135px;
  }

  .popover-body:hover {
    background-color: ${variables.backgroundColor};
    border-radius: 3px;
  }

  .popover .arrow::before,
  .popover .arrow::after {
    content: none;
  }
`;

const UserLogIn = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 7px;
  border-radius: 10px;
  background-color: ${variables.themeColorPrimary};
  color: ${variables.themeColorWhite};
  font-weight: 600;

  &:hover {
    transform: scale(1.1);
  }
`;
export default Header;
