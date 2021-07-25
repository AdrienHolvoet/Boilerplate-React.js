import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../resources/images/logo.svg";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { variables } from "../../styles/bases/variable";
import { media } from "../../styles/bases/media";

const SideNavbar = ({ routes, refSidebar }) => {
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
    <Sidenavbar ref={refSidebar} id="sidenavbar">
      <NavHeader>
        <Link to="/" onClick={onClickLink}>
          <img src={logo} alt="logo" />
        </Link>
      </NavHeader>
      <Wrapper>
        {routes?.map((route, index) => (
          <Item key={index} exact to={route.url} onClick={onClickLink}>
            {route.name}
          </Item>
        ))}
      </Wrapper>
    </Sidenavbar>
  );
};

const Sidenavbar = styled.section`
  height: 100%;
  background-color: ${variables.themeColorWhite};
  font-weight: bold;
  width: 0;
  z-index: 999;
  position: absolute;
  transition: all 0.3s linear;
  transform-origin: 1px;
  overflow-x: hidden;

  ${media.tablet`
  display: unset;
  width: 25%;
  position: sticky;
  top: 0;`}
`;

const NavHeader = styled.header`
  cursor: pointer;
  height: ${variables.headerHeigth};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  border-top: 3px solid ${variables.backgroundColor};
  display: flex;
  flex-direction: column;
  text-align: center;

  .active {
    background-color: ${variables.themeColorPrimary};
    color: ${variables.themeColorWhite};
  }

  .active:hover {
    background-color: ${variables.themeColorPrimary};
    color: ${variables.themeColorWhite};
  }
`;

const Item = styled(NavLink)`
  margin: 6px;
  padding: 9px;
  border-radius: 5px;

  &:hover {
    color: ${variables.themeColorBlack};
    background-color: ${variables.backgroundColor};
  }
`;

export default SideNavbar;
