import { useContext } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import User from "../contexts/user";

const AuthenticatedRoute = ({ path, component }) => {
  const { user } = useContext(User);
  const history = useHistory();

  return user ? (
    <Route exact path={path} component={component} />
  ) : (
    <>
      <Redirect
        to={{
          pathname: "/login",
          state: { redirectPath: history.location.pathname },
        }}
      />
    </>
  );
};

export default AuthenticatedRoute;
