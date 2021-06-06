import React, { useState, useEffect, useRef } from "react";
import routes from "../../routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import User from "../../contexts/user";
import { getItem } from "../../utils/localStorage";
import SideNavbar from "../../components/navigation/sideNavbar";
import ShowSideNavbar from "../../contexts/showSideNavbar";
import { NAVIGATION } from "./constants";
import { useMediaQuery } from "react-responsive";

function App() {
  const [user, setUser] = useState();
  const [showSideNavbar, setShowSideNavbar] = useState(true);
  const isTablet = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const refSidebar = useRef();

  useEffect(() => {
    //get user with jwt token from local storage
    const lUser = JSON.parse(getItem("user"));
    if (lUser) {
      setUser(lUser);
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
      <ShowSideNavbar.Provider value={{ showSideNavbar, setShowSideNavbar }}>
        <User.Provider value={{ user, setUser }}>
          <Router>
            <div className="overlay" id="overlay" />
            {showSideNavbar && (
              <SideNavbar refSidebar={refSidebar} routes={NAVIGATION} />
            )}
            {routes}
          </Router>
        </User.Provider>
      </ShowSideNavbar.Provider>
    </>
  );
}
export default App;
