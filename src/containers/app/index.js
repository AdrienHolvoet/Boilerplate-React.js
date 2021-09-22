import React, { useEffect, useRef } from "react";
import routes from "@routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import { getItem } from "@utils/localStorage";
import SideNavbar from "@components/navigation/sideNavbar";
import { NAVIGATION } from "./constants";
import { useMediaQuery } from "react-responsive";
import { setUser } from "../loginPage/actions";
import { useDispatch, useSelector } from "react-redux";
import "@scss/global.scss";
import "@components/inputs/inputs.scss";

function App() {
  const showSideNavbar = useSelector((state) => state.app?.showSideNavbar);
  const isTablet = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const refSidebar = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    //get user with jwt token from local storage
    const lUser = JSON.parse(getItem("user"));
    if (lUser) {
      dispatch(setUser(lUser));
    }
  }, []);

  useEffect(() => {
    const listener = (event) => {
      if (!refSidebar.current || refSidebar.current.contains(event.target)) {
        return;
      }
      //Clicking outside the opened sidebar
      sidenavbar.style.width = 0;
      overlay.style.display = "none";
    };
    if (showSideNavbar) {
      if (isTablet) {
        document.addEventListener("mousedown", listener);
        sidenavbar.style.width = 0;
      } else {
        sidenavbar.style.width = "25%";
        document.removeEventListener("mousedown", listener);
      }
    }

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [isTablet]);

  return (
    <>
      <Router>
        <div className="overlay" id="overlay" />
        {showSideNavbar && (
          <SideNavbar refSidebar={refSidebar} routes={NAVIGATION} />
        )}
        {routes}
      </Router>
    </>
  );
}
export default App;
