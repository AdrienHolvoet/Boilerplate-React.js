import Checkpoint from "../containers/checkpointPage";
import NotFoundPage from "../containers/notFoundPage";
import Home from "../containers/homePage/index";
import { Switch, Route } from "react-router-dom";
import Login from "../containers/loginPage";
import Registration from "../containers/registrationPage";
import AuthenticatedRoute from "./authenticatedRoute";
import Analyse from "../containers/analysePage";

const routes = (
  <Switch>
    <AuthenticatedRoute exact path="/" component={Home} />
    <AuthenticatedRoute
      path="/checkpoints/:checkpointPublicId/controls/:controlPublicId/diversity-class/:diversityClassPublicId/"
      component={Checkpoint}
    />
    <AuthenticatedRoute
      path="/checkpoints/:checkpointPublicId/controls/:controlPublicId"
      component={Checkpoint}
    />
    <AuthenticatedRoute
      path="/checkpoints/:checkpointPublicId/imported-images"
      component={Checkpoint}
    />
    <AuthenticatedRoute path="/analyse/:controlPublicId" component={Analyse} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/registration" component={Registration} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default routes;
