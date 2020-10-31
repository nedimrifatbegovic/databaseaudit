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
import InternalLogin from "../pages/InternalLogin/InternalLogin";
import Jumbo from "../components/Jumbo/Jumbo";
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
          <Route path={paths.admin.user}>
            <ANavBar />
            <AdminUsermanagement />
          </Route>
          {/* Internal Audit Pages */}
          <Route exact path={paths.internal.home}>
            <div>Internal Audit Page</div>
          </Route>
          <Route path={paths.internal.login}>
            <ANavBar />
            <Jumbo />
            <Container>
              <InternalLogin />
            </Container>
          </Route>
          <Route path={paths.internal.audit}>
            <div>Internal Audit Audit Page</div>
          </Route>
          <Route path={paths.internal.password}>
            <div>Internal Audit Password Page</div>
          </Route>
          <Route path={paths.internal.request}>
            <div>Internal Audit Request Page</div>
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
