import { Redirect, Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthenticatedRoute = ({ path, component }) => {
  const user = useSelector((state) => state.user);
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
