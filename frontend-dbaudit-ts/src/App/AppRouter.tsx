import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ANavBar from "../components/Admin/components/ANavBar/ANavBar";
import AdminHome from "../pages/AdminHome/AdminHome";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminUsermanagement from "../pages/AdminUsermanagement/AdminUsermanagement";
import { Container } from "react-bootstrap";
import Error404 from "../pages/Error404/Error404";
import ExternalLogin from "../pages/ExternalLogin/ExternalLogin";
import Footer from "../components/Footer/Footer";
import Home from "../pages/Home/Home";
import INavBar from "../components/Internal/components/INavBar/INavBar";
import InternalAddConfig from "../pages/InternalAddConfig/InternalAddConfig";
import InternalHome from "../pages/InternalHome/InternalHome";
import InternalLogin from "../pages/InternalLogin/InternalLogin";
import InternalPasswordChange from "../pages/InternalPasswordChange/InternalPasswordChange";
import Jumbo from "../components/Jumbo/Jumbo";
import LoginStatus from "../pages/LoginStatus/LoginStatus";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import React from "react";
import { paths } from "./AppRouter.resources";
import styled from "styled-components";

const MainSection = styled.div`
  flex-grow: 1;
`;

export default function AppRouter() {
  return (
    <Router>
      <MainSection>
        <Switch>
          <Route exact path="/">
            <NavigationBar />
            <Jumbo />
            <Container>
              <Home />
            </Container>
          </Route>
          {/* Admin Pages */}
          <Route exact path={paths.admin.home}>
            <ANavBar />
            <Jumbo />
            <Container>
              <AdminHome />
            </Container>
          </Route>
          <Route path={paths.admin.login}>
            <ANavBar />
            <Jumbo />
            <Container>
              <AdminLogin />
            </Container>
          </Route>
          <Route path={paths.admin.loginstatus}>
            <ANavBar />
            <Jumbo />
            <Container>
              <LoginStatus type="admin" />
            </Container>
          </Route>
          <Route path={paths.admin.user}>
            <ANavBar />
            <AdminUsermanagement />
          </Route>
          {/* Internal Audit Pages */}
          <Route exact path={paths.internal.home}>
            <INavBar />
            <Jumbo />
            <Container>
              <InternalHome />
            </Container>
          </Route>
          <Route path={paths.internal.login}>
            <INavBar />
            <Jumbo />
            <Container>
              <InternalLogin />
            </Container>
          </Route>
          <Route path={paths.internal.loginstatus}>
            <INavBar />
            <Jumbo />
            <Container>
              <LoginStatus type="internal" />
            </Container>
          </Route>
          <Route path={paths.internal.audit}>
            <INavBar />
            <Jumbo />
            <Container>
              <div>Internal Audit Audit Page</div>
            </Container>
          </Route>
          <Route path={paths.internal.password}>
            <INavBar />
            <Jumbo />
            <Container>
              <InternalPasswordChange />
            </Container>
          </Route>
          <Route path={paths.internal.request}>
            {/* Config page */}
            <INavBar />
            <Jumbo />
            <Container>
              <InternalAddConfig />
            </Container>
          </Route>
          {/* External Audit Pages */}
          <Route exact path={paths.external.home}>
            <div>External Audit Page</div>
          </Route>
          <Route path={paths.external.login}>
            <ANavBar />
            <Jumbo />
            <Container>
              <ExternalLogin />
            </Container>
          </Route>
          <Route path={paths.external.loginstatus}>
            <ANavBar />
            <Jumbo />
            <Container>
              <LoginStatus type="external" />
            </Container>
          </Route>
          <Route path={paths.external.request}>
            <div>External Audit Request Page</div>
          </Route>
          <Route path={paths.external.client}>
            <div>External Audit Client Page</div>
          </Route>
          <Route path={paths.external.audit}>
            <div>External Audit Client Audit Page</div>
          </Route>
          {/* Error 404: Not found Page */}
          <Route>
            <NavigationBar />
            <Container>
              <Error404 />
            </Container>
          </Route>
        </Switch>
      </MainSection>
      <Footer />
    </Router>
  );
}
