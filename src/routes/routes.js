import NotFoundPage from "../containers/notFoundPage";
import Home from "../containers/homePage/index";
import { Switch, Route } from "react-router-dom";
import Login from "../containers/loginPage";
import Registration from "../containers/registrationPage";
import AuthenticatedRoute from "./authenticatedRoute";

//Replace <Route by <AuthenticatedRoute if you want the user connected to access this route
//<AuthenticatedRoute exact path="/" component={Home} />
const routes = (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/registration" component={Registration} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default routes;
