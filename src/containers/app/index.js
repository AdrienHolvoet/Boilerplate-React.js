import React, { useState, useEffect } from "react";
import routes from "../../routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import User from "../../contexts/user";
import { getItem } from "../../utils/localStorage";
import SideNavbar from "../../components/navigation/sideNavbar";
import ShowSideNavbar from "../../contexts/showSideNavbar";
import { NAVIGATION } from "./constants";

function App() {
  const [user, setUser] = useState();
  const [showSideNavbar, setShowSideNavbar] = useState(true);

  useEffect(() => {
    //get user with jwt token from local storage
    const lUser = JSON.parse(getItem("user"));
    if (lUser) {
      setUser(lUser);
    }
  }, []);

  return (
    <>
      <ShowSideNavbar.Provider value={{ showSideNavbar, setShowSideNavbar }}>
        <User.Provider value={{ user, setUser }}>
          <Router>
            {showSideNavbar && <SideNavbar routes={NAVIGATION} />}
            {routes}
          </Router>
        </User.Provider>
      </ShowSideNavbar.Provider>
    </>
  );
}
export default App;
