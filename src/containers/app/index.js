import React, { useState, useEffect } from "react";
import routes from "../../routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import User from "../../contexts/user";
import { getItem } from "../../utils/localStorage";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    //get user with jwt token from local storage
    const lUser = JSON.parse(getItem("user"));
    if (lUser) {
      setUser(lUser);
    }
  }, []);

  return (
    <>
      <User.Provider value={{ user, setUser }}>
        <Router>{routes}</Router>
      </User.Provider>
    </>
  );
}
export default App;
